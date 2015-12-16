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

const RecordsVisualization = ({records, selectedDays, clickDay}) =>
  <div>
    <RecordsStat records={records}/>
    <PerDayTable
      records={records}
      selectedDays={selectedDays}
      clickDay={clickDay}
      colorFunction={recordsPerDayColorFunction}/>
    <PerDayTable
      records={records}
      selectedDays={selectedDays}
      clickDay={clickDay}
      colorFunction={journeysTimePerDayColorFunction}/>
    <RecordList
      records={selectedRecords(records, selectedDays)}/>
    <MapStations
      records={records}/>
  </div>

function mapStateToProps({records, selectedDays}) {
  return {
    'records': records.payload != undefined ? records.payload : [],
    selectedDays
  };
}

function mapActionsToProps (dispatch) {
  return {
    clickDay: (day) => dispatch(clickDay(day)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(RecordsVisualization);
