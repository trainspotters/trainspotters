'use strict';
import { recordTypes } from 'trainspotters-parser';
import { SECONDS_PER_HOUR, dateDiffInDays } from './utils.js';

export const isLegalTwoSidedJourney = (record) =>
  record.type === recordTypes.undergroundJourney &&
  record.from &&
  record.to &&
  record.startAt &&
  record.endAt;

export const journeysTimeInHours = (records) =>
  // use moments instead of SECONDS_PER_HOUR
  records
    .filter(isLegalTwoSidedJourney)
    .reduce((prev, cur) => prev + cur.duration, 0) / SECONDS_PER_HOUR;

export const selectedRecords = (records, selected) => {
  const now = new Date();
  return records.filter((record) => {
    const diff = dateDiffInDays(record.startAt, now);
    return selected.has(diff);
  });
}
