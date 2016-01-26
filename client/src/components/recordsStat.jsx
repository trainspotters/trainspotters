'use strict';
import React from 'react';
import {
  journeysTimeInSeconds,
  journeysTotalDistance,
  isLegalTwoSidedJourney,
} from '../recordsUtils.js'
import {
  formatMeterToKilometer,
  formatMeterToMile,
  formatSecondsToMinutesAndHours,
} from '../utils.js';
import { recordTypes } from 'trainspotters-parser';

export const RecordsStat = ({records, toggleUnitSystem}) => {
  const totalSeconds = journeysTimeInSeconds(records);
  const totalDistance = journeysTotalDistance(records);
  const journeysTime = formatSecondsToMinutesAndHours(totalSeconds);
  const twoSideJourneysCount = records.filter(isLegalTwoSidedJourney).length;
  const avgJourneyTime = formatSecondsToMinutesAndHours(totalSeconds/twoSideJourneysCount);
  const busJourneys = records
    .filter((record) => record.type === recordTypes.busJourney).length;
  const distanceString = toggleUnitSystem.metric ?
    `${formatMeterToKilometer(totalDistance)} km` :
    `${formatMeterToMile(totalDistance)} miles`;

  return <div className="row summary-main">
    <div className="column">
      <div className="summary-main--icon">
        <i className="fa fa-clock-o"></i>
      </div>
      <div className="summary-main--value">
        <p>{journeysTime}</p>
        <p>(avg. {avgJourneyTime})</p>
      </div>
    </div>
    <div className="column">
      <div className="summary-main--icon">
        <i className="fa fa-road"></i>
      </div>
      <div className="summary-main--value">
        {distanceString}
      </div>
    </div>
    <div className="column">
      <div className="summary-main--icon">
        <i className="fa fa-subway"></i>
      </div>
      <div className="summary-main--value">
        {twoSideJourneysCount}
      </div>
    </div>
    <div className="column">
      <div className="summary-main--icon">
        <i className="fa fa-bus"></i>
      </div>
      <div className="summary-main--value">
        {busJourneys}
      </div>
    </div>
  </div>
}
