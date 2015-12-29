'use strict';

export const JOURNEYS_DAY_VISUALIZATION = 'JOURNEYS_DAY_VISUALIZATION';
export const TIME_DAY_VISUALIZATION = 'TIME_DAY_VISUALIZATION';
export const DISTANCE_DAY_VISUALIZATION = 'DISTANCE_DAY_VISUALIZATION';

export function journeysDayVisualization() {
  return {
    type: JOURNEYS_DAY_VISUALIZATION,
  };
}

export function timeDayVisualization() {
  return {
    type: TIME_DAY_VISUALIZATION,
  };
}

export function distanceDayVisualization() {
  return {
    type: DISTANCE_DAY_VISUALIZATION,
  };
}
