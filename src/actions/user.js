import HDWalletProvider from 'truffle-hdwallet-provider';
import contract from 'truffle-contract';
import Web3 from 'web3';

import { PurchaseAlphaJSON } from 'lmnop-contracts';

import { Actions } from '../constants';

const handleError = (dispatch, err) => {
  dispatch({
    type: Actions.APP_ERROR,
    payload: err.message || 'failed',
  });
};

const getEthereum = async (mnemonic) => {
  let providerUrl = `https://rinkeby.infura.io/${process.env.REACT_APP_INFURA_TOKEN}`;

  const provider = new HDWalletProvider(mnemonic, providerUrl);
  const PurchaseAlphaContract = contract(PurchaseAlphaJSON);

  PurchaseAlphaContract.setProvider(provider);

  const PurchaseAlpha = await PurchaseAlphaContract.deployed();
  const web3 = new Web3(provider);

  console.log(web3);
  console.log(provider);
  console.log(PurchaseAlpha);

  return {
    web3,
    provider,
    PurchaseAlpha,
  };
};

export const getContract = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: Actions.APP_LOADING,
      payload: true,
    });

    const state = getState();

    if (state.user.mnemonic) {
      const ethereum = await getEthereum(state.user.mnemonic);
    }

    dispatch({
      type: Actions.APP_LOADING,
      payload: false,
    });
  } catch (err) {
    handleError(dispatch, err);
  }
};
