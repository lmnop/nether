import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import user from './user';

const config = {
  version: '0.0.1',
  key: 'nether',
  storage,
  debug: true,
};

const rootReducer = combineReducers({
  user,
});

export default persistReducer(config, rootReducer);
