import HDWalletProvider from 'truffle-hdwallet-provider';
import contract from 'truffle-contract';
import Web3 from 'web3';
import _ from 'lodash';

import { PurchaseAlphaJSON } from 'lmnop-contracts';

import * as api from '../api';

import { Actions } from '../constants';

const handleError = (dispatch, err) => {
  dispatch({
    type: Actions.APP_ERROR,
    payload: err.message || 'failed',
  });
};

const getEthereum = async (mnemonic) => {
  let providerUrl = `https://rinkeby.infura.io/${window.infuraToken}`;

  console.log(providerUrl);

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

const getBlock = (web3, block, address, contractAddress) => new Promise((resolve, reject) => {
  web3.eth.getBlock(block, true, (error, block) => {
    let transactions = [];

    if (block) {
      transactions = _.filter(block.transactions, {
        from: address,
        to: contractAddress,
      });
    }

    return resolve(transactions);
  });
});

const getPurchasePending = (web3, address, purchaseAddress, dispatch) => {
  setInterval(async () => {
    const transactions = await getBlock(web3, 'pending', address, purchaseAddress);

    dispatch({
      type: Actions.USER_SET_PENDING_PURCHASES,
      payload: transactions,
    });
  }, 1000);
};

export const resetApp = () => (dispatch) => {
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

    dispatch({
      type: Actions.PURCHASE_CONTRACT_SET,
      payload: {
        price: price.toNumber(),
        priceEth: web3.utils.fromWei(price, 'ether'),
      },
    });

    const isPurchaser = await PurchaseAlpha.isPurchaser(address);

    if (isPurchaser) {
      const purchaser = await PurchaseAlpha.getPurchaser(address);

      purchaseContract.units = purchaser[0].toNumber();

      purchaseContract.blockNumbers = _.map(purchaser[1], (blocknumber) => {
        return blocknumber.toNumber();
      });

      const getBlocks = _.map(blockNumbers, (block) => {
        return getBlock(web3, block, address, PurchaseAlpha.address);
      });

      purchaseContract.purchases = await Promise.all(getBlocks);
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
