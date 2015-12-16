'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { JourneysStat } from '../components/journeysStat.jsx';

const AllJourneysStat = ({journeys}) =>
  <JourneysStat
    journeys={journeys == undefined ? [] : journeys}/>

export default connect(
  ({records, selectedDays}) => {return {"journeys": records.payload}},
  (dispatch) => {return {}})
  (AllJourneysStat);
