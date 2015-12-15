'use strict';
import React from 'react';
import { recordTypes } from 'trainspotters-parser';

export function RecordListItem({record, children}) {
  switch (record.type) {
    case recordTypes.undergroundJourney:
      const { from, to } = record
      return <div>Underground from { from } to { to }</div>;
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
  // <RecordListItem className="recordList-item" record={record} key={index}>
  const recordItems = records.map((record, index) => <RecordListItem record={record} key={index}></RecordListItem>);

  return (<div className="recordList">
    {recordItems}
  </div>)
};
