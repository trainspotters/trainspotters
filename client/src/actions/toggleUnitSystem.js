'use strict';

export const METRIC_SYSTEM = 'METRIC_SYSTEM';
export const IMPERIAL_SYSTEM = 'IMPERIAL_SYSTEM';

export function metricSystem() {
  return {
    type: METRIC_SYSTEM,
  };
}

export function imperialSystem() {
  return {
    type: IMPERIAL_SYSTEM,
  };
}
