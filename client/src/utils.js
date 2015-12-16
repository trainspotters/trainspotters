'use strict';
import _ from 'underscore';
import stations from '../../stations.json';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const normalizeWeekday = (day) => (day % 7 + 7) % 7;

// a and b are javascript Date objects
export const dateDiffInDays = (a, b) => {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}

export const getCoordinateByName = (name) => {
  return _.find(stations, ({names}) => { return names.indexOf(name) > -1; });
}
