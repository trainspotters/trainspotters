'use strict';
import stations from '../../stations.json';
import moment from 'moment';

export const MS_PER_HOUR = 1000 * 60 * 60;
export const SECONDS_PER_HOUR = 60 * 60;
export const MS_PER_DAY = MS_PER_HOUR * 24;

// XXX use moment?
export const normalizeWeekday = (day) => (day % 7 + 7) % 7;

// a and b are javascript Date objects
export const dateDiffInDays = (a, b) => {
  return moment(b).startOf('day').diff(moment(a).startOf('day'), 'days');
}

export const getCoordinateByName = (name) => {
  return stations.find(({names}) => { return names.indexOf(name) > -1; });
}
