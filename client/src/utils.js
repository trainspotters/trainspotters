'use strict';
import moment from 'moment';
import 'moment-duration-format';
import numeral from 'numeral';

export const MS_PER_HOUR = 1000 * 60 * 60;
export const SECONDS_PER_HOUR = 60 * 60;
export const MS_PER_DAY = MS_PER_HOUR * 24;
const KM_IN_MILE = 1.609344; // 1 mile = 1.609344 km

// XXX use moment?
export const normalizeWeekday = (day) => (day % 7 + 7) % 7;

// a and b are javascript Date objects
export const dateDiffInDays = (a, b) => {
  return moment(b).startOf('day').diff(moment(a).startOf('day'), 'days');
}

export const formatMeterToKilometer = (distance) => {
  return numeral(distance / 1000).format('0,0.0');
}

export const formatMeterToMile = (distance) => {
  return numeral(distance / 1000 / KM_IN_MILE).format('0,0.0');
}

export const formatSecondsToMinutesAndHours = (seconds) => {
  return moment.duration(seconds, 'seconds').format('h [hours and] m [minutes]');

}
