'use strict';
import {
  JOURNEYS_DAY_VISUALIZATION,
  TIME_DAY_VISUALIZATION,
  DISTANCE_DAY_VISUALIZATION,
} from '../actions/toggleVisualization';

const initialState = {
  dayTableVisualization: 'RECORDS_PER_DAY',
  journeysPerDay: true,
  timePerDay: false,
  distancePerDay: false,
};

export default function toggleVisualization(state = initialState, { type }) {
  switch (type) {
    case JOURNEYS_DAY_VISUALIZATION:
      return {
        ...state,
        dayTableVisualization: 'RECORDS_PER_DAY',
        journeysPerDay: true,
        timePerDay: false,
        distancePerDay: false,
      };
    case TIME_DAY_VISUALIZATION:
      return {
        ...state,
        dayTableVisualization: 'TIME_PER_DAY',
        journeysPerDay: false,
        timePerDay: true,
        distancePerDay: false,
      };
    case DISTANCE_DAY_VISUALIZATION:
      return {
        ...state,
        dayTableVisualization: 'DISTANCE_PER_DAY',
        journeysPerDay: false,
        timePerDay: false,
        distancePerDay: true,
      };
    default:
      return state;
  }
};
