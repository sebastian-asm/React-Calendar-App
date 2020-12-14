import { combineReducers } from 'redux';

import calendarReducer from './calendarReducer';
import uiReducer from './uiReducer';

const rootReducers = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
});

export default rootReducers;
