'use strict';
import { recordTypes } from 'trainspotters-parser';
import { dateDiffInDays } from './utils.js';
import moment from 'moment';

export const isLegalTwoSidedJourney = (record) =>
  record.type === recordTypes.undergroundJourney &&
  record.from &&
  record.to &&
  record.startAt &&
  record.endAt;

export const journeysTimeInHours = (records) =>
  moment.duration(journeysTimeInSeconds(records), 'seconds').asHours();

export const journeysTimeInSeconds = (records) =>
  records
    .filter(isLegalTwoSidedJourney)
    .reduce((prev, cur) => prev + cur.duration, 0);

export const selectedRecords = (records, selected) => {
  const now = new Date();
  return records.filter((record) => {
    const diff = dateDiffInDays(record.startAt, now);
    return selected.has(diff);
  });
}
