'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecordsStat } from '../components/recordsStat.jsx';
import SwitchUnitSystem from '../components/switchUnitSystem';
import SwitchVisualization from '../components/switchVisualization';
import { MapStations } from '../components/mapStations.js';
import { TopStations } from '../components/topStations.js';
import { PerDayTable } from '../components/perDaysTable.jsx';
import RecordList from '../components/recordList.jsx';
import { selectedRecords } from '../recordsUtils.js';
import { clickDay } from '../actions/selectedDays.js';
import { toggleTableDayVisualization } from '../actions/toggleVisualization';

const RecordsVisualization = ({records, selectedDays, clickDay, toggleVisualization, toggleUnitSystem}) => {
  const { dayTableVisualization } = toggleVisualization;

  return (
    <div>
      <RecordsStat
        records={records}
        toggleUnitSystem={toggleUnitSystem}
      />
      <div className="row filters">
        <div className="column column-25">
          <button className="button full-width">Tube</button>
        </div>
        <div className="column column-25">
          <button className="button full-width">Bus</button>
        </div>
        <div className="column column-50">
          <SwitchUnitSystem />
        </div>
      </div>
      <div className="row filters">
        <div className="column column-50 column-offset-50">
          <SwitchVisualization />
        </div>
      </div>
      <PerDayTable
        records={records}
        selectedDays={selectedDays}
        clickDay={clickDay}
        vizualisationType={dayTableVisualization}
      />
      <RecordList
        records={selectedRecords(records, selectedDays)}
        toggleUnitSystem={toggleUnitSystem}
      />
      <MapStations
        records={records}
      />
      <TopStations
        records={records}
      />
    </div>
  );
}

function mapStateToProps({records, selectedDays, toggleVisualization, toggleUnitSystem}) {
  return {
    'records': records.payload != undefined ? records.payload : [],
    selectedDays,
    toggleVisualization,
    toggleUnitSystem,
  };
}

function mapActionsToProps (dispatch) {
  return {
    clickDay: (day) => dispatch(clickDay(day)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(RecordsVisualization);
