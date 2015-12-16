'use strict';
import React from 'react';
import { journeysTimeInHours, isLegalTwoSidedJourney } from '../recordsUtils.js'
import { recordTypes } from 'trainspotters-parser';

export const RecordsStat = ({records}) => {
  const journeysTime = journeysTimeInHours(records);
  const twoSideJourneysCount = records.filter(isLegalTwoSidedJourney).length;
  const busJourneys = records
    .filter((record) => record.type == recordTypes.BUS_JOURNEY).length;

  return (<div>
    <div>Journeys cumulative duration: {journeysTime} hours.</div>
    <div>Journeys count (not including bus journeys): {twoSideJourneysCount}.</div>
    <div>Average journey time: {(journeysTime/twoSideJourneysCount)*60} minutes.</div>
    <div>Bus journeys count: {busJourneys}.</div>
  </div>);
}
