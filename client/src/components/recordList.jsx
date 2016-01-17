'use strict';
import React from 'react';
import { recordTypes } from 'trainspotters-parser';
import {
  formatMeterToKilometer,
  formatMeterToMile,
  formatSecondsToMinutesAndHours
} from '../utils.js';

export function RecordListItem({record, toggleUnitSystem}) {
  switch (record.type) {
    case recordTypes.undergroundJourney:
      const { from, to, duration, distance } = record;
      const distanceString = toggleUnitSystem.metric ?
        `${formatMeterToKilometer(distance)} km` :
        `${formatMeterToMile(distance)} miles`;
      const formatedDuration = formatSecondsToMinutesAndHours(duration);
      return <div>Underground from { from.name } to { to.name } ({ distanceString }) and took { formatedDuration }.</div>;
    case recordTypes.busJourney:
      const { route } = record
      return <div>Bus on route { route }</div>;
    case recordTypes.topup:
      const { credit, at } = record;
      return <div>Top-up £{ credit } { at ? `at ${at}` : null }</div>;
    default:
      return <span></span>
  }
};

export default function RecordList({records, toggleUnitSystem}) {
  const recordItems = records.map((record, index) => <RecordListItem record={record} key={index} toggleUnitSystem={toggleUnitSystem} />);

  return (<div className="recordList">
    {recordItems}
  </div>);
};
