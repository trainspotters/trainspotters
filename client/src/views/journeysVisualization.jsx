'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { JourneysStat } from '../components/journeysStat.jsx';

import MapStations from './map';
import { PerDayTable, journeysPerDayColorFunction, journeysTimePerDayColorFunction }
  from '../components/perDaysTable.jsx';
import RecordList from '../components/recordList.jsx';
import { selectedJourneys } from '../journeysUtils.js';
import { clickDay } from '../actions/selectedDays.js';

const JourneysVisualization = ({journeys, selectedDays, clickDay}) =>
  <div>
    <JourneysStat journeys={journeys}/>
    <PerDayTable
      journeys={journeys}
      selectedDays={selectedDays}
      clickDay={clickDay}
      colorFunction={journeysPerDayColorFunction}/>
    <PerDayTable
      journeys={journeys}
      selectedDays={selectedDays}
      clickDay={clickDay}
      colorFunction={journeysTimePerDayColorFunction}/>
      <RecordList
        records={selectedJourneys(journeys, selectedDays)}/>
      <MapStations/>
  </div>

function mapStateToProps({records, selectedDays}) {
  return {
    'journeys': records.payload != undefined ? records.payload : [],
    selectedDays
  };
}

function mapActionsToProps (dispatch) {
  return {
    clickDay: (day) => dispatch(clickDay(day)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(JourneysVisualization);
