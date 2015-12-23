'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { toggleTableDayVisualization } from '../actions/toggleVisualization';

const SwitchVisualization = ({toggleTableDayVisualization, toggleVisualization}) => {
  const { dayTableVisualization, journeysPerDay, timePerDay } = toggleVisualization;

  return (
    <div className={"switch-toggle"}>
      <div>
        <input
          id={"r1"}
          type={"radio"}
          checked={journeysPerDay}
          onClick={() => { journeysPerDay ? '' : toggleTableDayVisualization() }}
        />
        <label
          htmlFor={"r1"}
          name={"toggleDayVisualization"}
        >Journeys per day</label>
        <input
          id={"r2"}
          type={"radio"}
          checked={timePerDay}
          onClick={() => { timePerDay ? '' : toggleTableDayVisualization() }}
        />
        <label
          htmlFor={"r2"}
          name={"toggleDayVisualization"}
        >Time per day</label>
      </div>
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
