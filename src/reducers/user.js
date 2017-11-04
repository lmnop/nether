import * as actions from '../constants';

const initialState = {
  initialized: false,
  loading: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actions.USER_SET_VALUES: {
      return Object.assign({}, state, action.payload);
    }

    default: {
      return state;
    }
  }
}
