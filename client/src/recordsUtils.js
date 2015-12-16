'use strict';
import { recordTypes } from 'trainspotters-parser';
import { MS_PER_HOUR, dateDiffInDays } from './utils.js';

export const isLegalTwoSidedJourney = (record) =>
  record.type === recordTypes.undergroundJourney &&
  record.from != undefined && record.to != undefined &&
  record.startAt != undefined && record.endAt != undefined;

export const journeysTimeInHours = (records) =>
  // use moments instead of MS_PER_HOUR
  records
    .filter(isLegalTwoSidedJourney)
    .map((journey) => journey.endAt - journey.startAt)
    .reduce((prev, cur) => prev + cur, 0) / MS_PER_HOUR;

export const selectedRecords = (records, selected) => {
  const now = new Date();
  return records.filter((record) => {
    const diff = dateDiffInDays(record.startAt, now);
    return selected.has(diff);
  });
}
