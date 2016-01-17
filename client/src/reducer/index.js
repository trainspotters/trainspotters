'use strict';
import { combineReducers } from 'redux';
import records from './records';
import selectedDays from './selectedDays';
import toggleVisualization from './toggleVisualization';
import toggleUnitSystem from './toggleUnitSystem';

export default combineReducers({
  records,
  selectedDays,
  toggleVisualization,
  toggleUnitSystem,
});
