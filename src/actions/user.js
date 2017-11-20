import HDWalletProvider from 'truffle-hdwallet-provider';
import contract from 'truffle-contract';
import Web3 from 'web3';
import _ from 'lodash';

import { PurchaseAlphaJSON } from 'lmnop-contracts';

import history from '../history';

import * as api from '../api';

import { Actions } from '../constants';

let intervalPurchasePending;

const handleError = (dispatch, err) => {
  dispatch({
    type: Actions.APP_ERROR,
    payload: err.message || 'failed',
  });
};

const getEthereum = async (mnemonic) => {
  let providerUrl = `https://rinkeby.infura.io/${window.infuraToken}`;

  const provider = new HDWalletProvider(mnemonic, providerUrl);
  const PurchaseAlphaContract = contract(PurchaseAlphaJSON);

  PurchaseAlphaContract.setProvider(provider);

  const PurchaseAlpha = await PurchaseAlphaContract.deployed();
  const web3 = new Web3(provider);

  return {
    web3,
    provider,
    PurchaseAlpha,
  };
};

const getBalance = (web3, address) => new Promise((resolve, reject) => {
  web3.eth.getBalance(address, (error, value) => {
    return resolve(value);
  });
});

const getBlock = (web3, blocknumber, address, contractAddress) => new Promise((resolve, reject) => {
  web3.eth.getBlock(blocknumber, true, (error, block) => {
    const transactions = _.chain(block.transactions)
      .filter((transaction) => {
        return address.toLowerCase() === transaction.from.toLowerCase()
          && contractAddress.toLowerCase() === transaction.to.toLowerCase();
      })
      .map((transaction) => {
        transaction.valueEth = web3.utils.fromWei(transaction.value, 'ether');

        return transaction;
      })
      .value();

    return resolve(transactions);
  });
});

const getPurchasePending = (web3, address, purchaseAddress, dispatch) => {
  intervalPurchasePending = setInterval(async () => {
    const transactions = await getBlock(web3, 'pending', address, purchaseAddress);

    dispatch({
      type: Actions.USER_SET_PENDING_PURCHASES,
      payload: transactions,
    });
  }, 1000);
};

export const resetApp = () => (dispatch) => {
  if (intervalPurchasePending) {
    clearInterval(intervalPurchasePending);
  }

  dispatch({
    type: Actions.APP_RESET,
  });
};

export const unlockAccount = (mnemonic, email) => async (dispatch) => {
  try {
    dispatch({
      type: Actions.APP_LOADING,
      payload: true,
    });

    const { provider, web3, PurchaseAlpha } = await getEthereum(mnemonic);

    const address = provider.address;
    const balance = await getBalance(web3, address);
    const purchaseContract = {
      units: 0,
      blockNumbers: [],
      purchases: [],
    };

    await api.unlockAccount({
      address,
      email,
    });

    getPurchasePending(web3, address, PurchaseAlpha.address, dispatch);

    const price = await PurchaseAlpha.price();
    const estimatedGas = await PurchaseAlpha.purchase.estimateGas(1);

    dispatch({
      type: Actions.PURCHASE_CONTRACT_SET,
      payload: {
        price: price.toNumber(),
        priceEth: web3.utils.fromWei(price, 'ether'),
        estimatedGasEth: web3.utils.fromWei(_.round(estimatedGas, -6), 'ether'),
      },
    });

    const isPurchaser = await PurchaseAlpha.isPurchaser(address);

    if (isPurchaser) {
      const purchaser = await PurchaseAlpha.getPurchaser(address);

      purchaseContract.units = purchaser[0].toNumber();

      console.log('UNITS', purchaseContract.units);

      purchaseContract.blockNumbers = _.chain(purchaser[1])
        .map((blocknumber) => {
          return blocknumber.toNumber();
        })
        .uniq()
        .value();

      console.log('blocks', purchaseContract.blockNumbers);

      const getBlocks = _.map(purchaseContract.blockNumbers, (block) => {
        return getBlock(web3, block, address, PurchaseAlpha.address);
      });

      purchaseContract.purchases = _.flatten(await Promise.all(getBlocks));

      console.log(purchaseContract.purchases.length);
    }

    dispatch({
      type: Actions.USER_SET,
      payload: {
        mnemonic,
        address,
        balance,
        balanceEth: web3.utils.fromWei(balance, 'ether'),
        email,
        purchaseContract,
      },
    });

    dispatch({
      type: Actions.APP_LOADING,
      payload: false,
    });
  } catch (err) {
    handleError(dispatch, err);
  }
};

export const createAccount = (mnemonic, email) => async (dispatch) => {
  try {
    dispatch({
      type: Actions.APP_LOADING,
      payload: true,
    });

    const { provider, web3 } = await getEthereum(mnemonic);

    const address = provider.address;
    const balance = await getBalance(web3, address);

    await api.createAccount({
      address,
      email,
      mnemonic,
    });

    dispatch({
      type: Actions.USER_SET,
      payload: {
        mnemonic,
        address,
        balance,
        balanceEth: web3.utils.fromWei(balance, 'ether'),
        email,
      },
    });

    dispatch({
      type: Actions.APP_LOADING,
      payload: false,
    });
  } catch (err) {
    handleError(dispatch, err);
  }
};

export const getPurchaseAlphaContract = () => async (dispatch) => {
  try {
    dispatch({
      type: Actions.APP_LOADING,
      payload: true,
    });

    const { provider, web3, PurchaseAlpha } = await getEthereum('default');

    const price = await PurchaseAlpha.price();
    const estimatedGas = await PurchaseAlpha.purchase.estimateGas(1);

    dispatch({
      type: Actions.PURCHASE_CONTRACT_SET,
      payload: {
        price: price.toNumber(),
        priceEth: web3.utils.fromWei(price, 'ether'),
        estimatedGasEth: web3.utils.fromWei(_.round(estimatedGas, -6), 'ether'),
      },
    });

    dispatch({
      type: Actions.APP_LOADING,
      payload: false,
    });
  } catch (err) {
    handleError(dispatch, err);
  }
};

export const purchaseAlpha = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Actions.APP_LOADING,
      payload: true,
    });

    const state = getState();

    const { provider, web3, PurchaseAlpha } = await getEthereum(state.user.mnemonic);

    const price = await PurchaseAlpha.price();
    const estimatedGas = await PurchaseAlpha.purchase.estimateGas(1);

    const address = provider.address;
    const balance = await getBalance(web3, address);

    if (balance < price.toNumber() + estimatedGas) {
      throw new Error('insufficient wallet balance')
    }

    await PurchaseAlpha.purchase(1, {
      from: address,
      value: price.toNumber(),
    });

    history.push('purchases');

    dispatch({
      type: Actions.APP_LOADING,
      payload: false,
    });
  } catch (err) {
    handleError(dispatch, err);
  }
};
