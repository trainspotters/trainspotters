'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { toggleTableDayVisualization } from '../actions/toggleVisualization';

const SwitchVisualization = ({toggleTableDayVisualization, toggleVisualization}) => {
  const { dayTableVisualization, journeysPerDay, timePerDay } = toggleVisualization;

  return (
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
  );
};

function mapStateToProps({toggleVisualization}) {
  return {
    toggleVisualization,
  };
}

function mapActionsToProps (dispatch) {
  return {
    toggleTableDayVisualization: () => dispatch(toggleTableDayVisualization()),
  };
}
export default connect(mapStateToProps, mapActionsToProps)(SwitchVisualization);
