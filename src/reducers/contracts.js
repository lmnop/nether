import { Actions } from '../constants';

const initialState = {
  purchase: {
    price: 0,
    priceEth: 0,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case Actions.APP_RESET: {
      return initialState;
    }

    case Actions.PURCHASE_CONTRACT_SET: {
      return {
        ...state,
        purchase: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
