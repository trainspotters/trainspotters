'use strict';
import {
  TOGGLE_DAY_TABLE_VISUALIZATION,
} from '../actions/toggleVisualization';
import {
  recordsPerDayColorFunction,
  journeysTimePerDayColorFunction,
} from '../components/perDaysTable';

const initialState = {
  dayTableVisualization: recordsPerDayColorFunction,
  journeysPerDay: true,
  timePerDay: false,
};

export default function toggleVisualization(state = initialState, { type }) {
  switch (type) {
    case TOGGLE_DAY_TABLE_VISUALIZATION:
      let dayTableVisualization;
      let journeysPerDay = false;

      if (state.dayTableVisualization === journeysTimePerDayColorFunction) {
        dayTableVisualization = recordsPerDayColorFunction;
        journeysPerDay = true;
      } else {
        dayTableVisualization = journeysTimePerDayColorFunction;
      }

      return {
        ...state,
        dayTableVisualization,
        journeysPerDay,
        timePerDay: !journeysPerDay,
      };
    default:
      return state;
  }
};
