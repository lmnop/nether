import { Actions } from '../constants';

const initialState = {
  mnemonic: null,
  address: null,
  balance: 0,
  email: null,
  purchasesPending: [],
  purchaseContract: {
    units: 0,
    blockNumbers: [],
    purchases: [],
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case Actions.APP_RESET: {
      return initialState;
    }

    case Actions.USER_SET: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case Actions.USER_SET_PENDING_PURCHASES: {
      if (action.payload.length !== state.purchasesPending.length) {
        return {
          ...state,
          purchasesPending: action.payload,
        };
      }
    }

    default: {
      return state;
    }
  }
}
