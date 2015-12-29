'use strict';
import {
  JOURNEYS_DAY_VISUALIZATION,
  TIME_DAY_VISUALIZATION,
  DISTANCE_DAY_VISUALIZATION,
} from '../actions/toggleVisualization';
import {
  recordsPerDayColorFunction,
  journeysTimePerDayColorFunction,
  journeysDistancePerDayColorFunction,
} from '../components/perDaysTable';

const initialState = {
  dayTableVisualization: recordsPerDayColorFunction,
  journeysPerDay: true,
  timePerDay: false,
  distancePerDay: false,
};

export default function toggleVisualization(state = initialState, { type }) {
  switch (type) {
    case JOURNEYS_DAY_VISUALIZATION:
      return {
        ...state,
        dayTableVisualization: recordsPerDayColorFunction,
        journeysPerDay: true,
        timePerDay: false,
        distancePerDay: false,
      };
    case TIME_DAY_VISUALIZATION:
      return {
        ...state,
        dayTableVisualization: journeysTimePerDayColorFunction,
        journeysPerDay: false,
        timePerDay: true,
        distancePerDay: false,
      };
    case DISTANCE_DAY_VISUALIZATION:
      return {
        ...state,
        dayTableVisualization: journeysDistancePerDayColorFunction,
        journeysPerDay: false,
        timePerDay: false,
        distancePerDay: true,
      };
    default:
      return state;
  }
};
