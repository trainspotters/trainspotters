'use strict';
import React from 'react';
import {
  journeysTimeInSeconds,
  journeysTotalDistance,
  isLegalTwoSidedJourney,
} from '../recordsUtils.js'
import { formatMeterToKilometer, formatSecondsToMinutesAndHours } from '../utils.js';
import { recordTypes } from 'trainspotters-parser';

export const RecordsStat = ({records}) => {
  const totalSeconds = journeysTimeInSeconds(records);
  const totalDistance = journeysTotalDistance(records);
  const journeysTime = formatSecondsToMinutesAndHours(totalSeconds);
  const twoSideJourneysCount = records.filter(isLegalTwoSidedJourney).length;
  const avgJourneyTime = formatSecondsToMinutesAndHours(totalSeconds/twoSideJourneysCount);
  const busJourneys = records
    .filter((record) => record.type === recordTypes.busJourney).length;

  return (<div>
    <div>Journeys cumulative duration: {journeysTime}.</div>
    <div>Journeys cumulative distance: {formatMeterToKilometer(totalDistance)} km.</div>
    <div>Average journey time: {avgJourneyTime}.</div>
    <div>Underground journeys count: {twoSideJourneysCount}.</div>
    <div>Bus journeys count: {busJourneys}.</div>
  </div>);
}
