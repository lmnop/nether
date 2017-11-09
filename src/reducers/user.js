import { Actions } from '../constants';

const initialState = {
  mnemonic: null,
  address: null,
  balance: 0,
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

    default: {
      return state;
    }
  }
}
