'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecordsStat } from '../components/recordsStat.jsx';

import { MapStations } from '../components/mapStations.js';
import { PerDayTable } from '../components/perDaysTable.jsx';
import RecordList from '../components/recordList.jsx';
import { selectedRecords } from '../recordsUtils.js';
import { clickDay } from '../actions/selectedDays.js';
import { toggleTableDayVisualization } from '../actions/toggleVisualization';

const RecordsVisualization = ({records, selectedDays, clickDay, toggleTableDayVisualization, toggleVisualization}) => {
  const { dayTableVisualization, journeysPerDay, timePerDay } = toggleVisualization;

  return (
    <div>
      <RecordsStat records={records}/>

      <div>
        <input
          id={"r1"}
          type={"radio"}
          checked={journeysPerDay}
          onClick={() => { toggleTableDayVisualization() }}
        />
        <label
          htmlFor={"r1"}
          name={"toggleDayVisualization"}
          >Journeys per day</label>
        <input
          id={"r2"}
          type={"radio"}
          checked={timePerDay}
          onClick={() => { toggleTableDayVisualization() }}
        />
        <label
          htmlFor={"r2"}
          name={"toggleDayVisualization"}
          >Time per day</label>
      </div>

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
