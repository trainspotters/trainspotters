'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecordsStat } from '../components/recordsStat.jsx';
import SwitchVisualization from '../components/switchVisualization';
import { MapStations } from '../components/mapStations.js';
import { PerDayTable } from '../components/perDaysTable.jsx';
import RecordList from '../components/recordList.jsx';
import { selectedRecords } from '../recordsUtils.js';
import { clickDay } from '../actions/selectedDays.js';
import { toggleTableDayVisualization } from '../actions/toggleVisualization';

const RecordsVisualization = ({records, selectedDays, clickDay, toggleVisualization}) => {
  const { dayTableVisualization } = toggleVisualization;

  return (
    <div>
      <RecordsStat records={records}/>
      <SwitchVisualization />
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
  };
}

export default connect(mapStateToProps, mapActionsToProps)(RecordsVisualization);
