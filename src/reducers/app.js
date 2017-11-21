import { Actions } from '../constants';

const initialState = {
  loading: false,
  error: '',
  open: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case Actions.APP_RESET: {
      return initialState;
    }

    case Actions.APP_LOADING: {
      return {
        ...state,
        loading: action.payload,
        error: '',
      };
    }

    case Actions.APP_FLIP_SIDEBAR: {
      return {
        ...state,
        open: !state.open,
      };
    }

    case Actions.APP_ERROR: {
      console.log(action.payload);

      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}
