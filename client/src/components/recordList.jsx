'use strict';
import React from 'react';
import { recordTypes } from 'trainspotters-parser';
import { formatMeterToKilometer } from '../utils.js';

export function RecordListItem({record, children}) {
  switch (record.type) {
    case recordTypes.undergroundJourney:
      const { from, to, duration, distance } = record
      const formatedDistance = formatMeterToKilometer(distance);
      return <div>Underground from { from.name } to { to.name } ({ formatedDistance } km) and took { duration/60 } minutes.</div>;
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

export default function RecordList({records}) {
  const recordItems = records.map((record, index) => <RecordListItem record={record} key={index}></RecordListItem>);

  return (<div className="recordList">
    {recordItems}
  </div>)
};
