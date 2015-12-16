'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickDay } from '../../actions/selectedDays.js';
import RecordList from '../../components/recordList';
import { selectedJourneys } from '../../journeysUtils.js'
import { PerDayTable, journeysPerDayColorFunction, journeysTimePerDayColorFunction }
  from '../../components/perDaysTable.jsx';

const JourneysTables = ({journeys, selectedDays, clickDay}) =>
  (<div>
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
  </div>)

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

export default connect(mapStateToProps, mapActionsToProps)(JourneysTables);
