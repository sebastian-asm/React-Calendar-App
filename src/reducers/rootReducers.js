import { combineReducers } from 'redux';

import { uiReducer } from './uiReducer';

const rootReducers = combineReducers({
  ui: uiReducer,
});

export default rootReducers;
