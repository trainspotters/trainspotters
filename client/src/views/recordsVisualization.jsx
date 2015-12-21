'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecordsStat } from '../components/recordsStat.jsx';

import { MapStations } from '../components/mapStations.js';
import { PerDayTable, recordsPerDayColorFunction, journeysTimePerDayColorFunction }
  from '../components/perDaysTable.jsx';
import RecordList from '../components/recordList.jsx';
import { selectedRecords } from '../recordsUtils.js';
import { clickDay } from '../actions/selectedDays.js';
import { toggleTableDayVisualization } from '../actions/toggleVisualization';

const RecordsVisualization = ({records, selectedDays, clickDay, toggleTableDayVisualization, toggleVisualization}) => {
  const { dayTableVisualization } = toggleVisualization;

  return (
    <div>
      <RecordsStat records={records}/>
      <button onClick={() => { toggleTableDayVisualization() }}>Toggle table day visualization function</button><br/>
      <PerDayTable
        records={records}
        selectedDays={selectedDays}
        clickDay={clickDay}
        colorFunction={dayTableVisualization}/>
      <RecordList
        records={selectedRecords(records, selectedDays)}/>
      <MapStations
        records={records}/>
    </div>
  );
}

function mapStateToProps({records, selectedDays, toggleVisualization}) {
  return {
    'records': records.payload != undefined ? records.payload : [],
    selectedDays,
    toggleVisualization,
  };
}

function mapActionsToProps (dispatch) {
  return {
    clickDay: (day) => dispatch(clickDay(day)),
    toggleTableDayVisualization: () => dispatch(toggleTableDayVisualization()),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(RecordsVisualization);
