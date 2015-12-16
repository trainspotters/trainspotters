'use strict';
import { recordTypes } from 'trainspotters-parser';
import { MS_PER_HOUR } from './utils.js'

export const isLegalTwoSidedJourney = (journey) =>
  journey.type === recordTypes.undergroundJourney &&
  journey.startAt != undefined &&
  journey.endAt != undefined;

export const journeysTimeInHours = (journeys) =>
  // use moments instead of MS_PER_HOUR
  journeys
    .filter(isLegalTwoSidedJourney)
    .map((journey) => journey.endAt - journey.startAt)
    .reduce((prev, cur) => prev + cur, 0) / MS_PER_HOUR;
