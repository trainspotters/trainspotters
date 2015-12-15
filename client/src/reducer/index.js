'use strict';
import { combineReducers } from 'redux';
import records from './records';
import selectedDays from './selectedDays.js';

export default combineReducers({
  records, selectedDays
});
