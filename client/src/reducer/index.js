'use strict';
import { combineReducers } from 'redux';
import records from './records';
import selectedDays from './selectedDays.js';
import toggleVisualization from './toggleVisualization';

export default combineReducers({
  records, selectedDays, toggleVisualization
});
