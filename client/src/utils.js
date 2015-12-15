'use strict';
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const normalizeWeekday = (day) => (day % 7 + 7) % 7;

export const repeat = (element, count) => Array.from(new Array(count), () => element);

// a and b are javascript Date objects
export const dateDiffInDays = (a, b) => {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}
