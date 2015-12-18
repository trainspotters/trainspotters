'use strict';
import React from 'react';
import { journeysTimeInSeconds, isLegalTwoSidedJourney } from '../recordsUtils.js'
import { recordTypes } from 'trainspotters-parser';
import moment from 'moment';
import 'moment-duration-format';

export const RecordsStat = ({records}) => {
  const totalSeconds = journeysTimeInSeconds(records);
  const journeysTime = moment.duration(totalSeconds, 'seconds').format("h [hours and] m [minutes]");
  const twoSideJourneysCount = records.filter(isLegalTwoSidedJourney).length;
  const avgJourneyTime = moment.duration(totalSeconds/twoSideJourneysCount, 'seconds').format("h [hours and] m [minutes]");
  const busJourneys = records
    .filter((record) => record.type === recordTypes.BUS_JOURNEY).length;

  return (<div>
    <div>Journeys cumulative duration: {journeysTime}.</div>
    <div>Average journey time: {avgJourneyTime}.</div>
    <div>Underground journeys count: {twoSideJourneysCount}.</div>
    <div>Bus journeys count: {busJourneys}.</div>
  </div>);
}
