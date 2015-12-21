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
};

export default function toggleVisualization(state = initialState, { type }) {
  switch (type) {
    case TOGGLE_DAY_TABLE_VISUALIZATION:
      let dayTableVisualization;
      if (state.dayTableVisualization === journeysTimePerDayColorFunction) {
        dayTableVisualization = recordsPerDayColorFunction;
      } else {
        dayTableVisualization = journeysTimePerDayColorFunction;
      }

      return {
        ...state,
        dayTableVisualization,
      };
    default:
      return state;
  }
};
