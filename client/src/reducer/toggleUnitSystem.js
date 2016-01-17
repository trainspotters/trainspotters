'use strict';
import {
  METRIC_SYSTEM,
  IMPERIAL_SYSTEM,
} from '../actions/toggleUnitSystem';

const initialState = {
  metric: true,
  imperial: false,
};

export default function toggleUnitSystem(state = initialState, { type }) {
  switch (type) {
    case METRIC_SYSTEM:
      return {
        ...state,
        metric: true,
        imperial: false,
      };
    case IMPERIAL_SYSTEM:
      return {
        ...state,
        metric: false,
        imperial: true,
      };
    default:
      return state;
  }
};
