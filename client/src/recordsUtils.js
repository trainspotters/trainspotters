'use strict';

import { recordTypes } from 'trainspotters-parser';
import { dateDiffInDays } from './utils.js';
import moment from 'moment';

const HEATMAP_COLORS = [
  '#ffffb2',
  '#fed976',
  '#feb24c',
  '#fd8d3c',
  '#f03b20',
  '#bd0026',
];

export const isLegalTwoSidedJourney = (record) =>
  record.type === recordTypes.undergroundJourney &&
  record.from.name &&
  record.to.name &&
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
};

export const similarJourneysColorFunction = (count) => {
  if(count <= 1) return HEATMAP_COLORS[0];
  if(count <= 4) return HEATMAP_COLORS[1];
  if(count <= 10) return HEATMAP_COLORS[2];
  if(count <= 15) return HEATMAP_COLORS[3];
  if(count <= 20) return HEATMAP_COLORS[4];
  return HEATMAP_COLORS[5];
};
