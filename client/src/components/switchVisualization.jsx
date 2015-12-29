'use strict';
import React from 'react';
import { connect } from 'react-redux';
import {
  journeysDayVisualization,
  timeDayVisualization,
  distanceDayVisualization,
} from '../actions/toggleVisualization';

const SwitchVisualization = ({journeysDayVisualization, timeDayVisualization, distanceDayVisualization, toggleVisualization}) => {
  const { dayTableVisualization, journeysPerDay, timePerDay, distancePerDay } = toggleVisualization;

  return (
    <div className={"switch-toggle"}>
      <div>
        <input
          id={"r1"}
          type={"radio"}
          checked={journeysPerDay}
          onClick={() => { journeysDayVisualization() }}
        />
        <label
          htmlFor={"r1"}
          name={"toggleDayVisualization"}
        >Journeys per day</label>
        <input
          id={"r2"}
          type={"radio"}
          checked={timePerDay}
          onClick={() => { timeDayVisualization() }}
        />
        <label
          htmlFor={"r2"}
          name={"toggleDayVisualization"}
        >Time per day</label>
        <input
          id={"r3"}
          type={"radio"}
          checked={distancePerDay}
          onClick={() => { distanceDayVisualization() }}
        />
        <label
          htmlFor={"r3"}
          name={"toggleDayVisualization"}
        >Distance per day</label>
      </div>
    </div>
  );
};

function mapStateToProps({toggleVisualization}) {
  return {
    toggleVisualization,
  };
}

function mapActionsToProps(dispatch) {
  return {
    journeysDayVisualization: () => dispatch(journeysDayVisualization()),
    timeDayVisualization: () => dispatch(timeDayVisualization()),
    distanceDayVisualization: () => dispatch(distanceDayVisualization()),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(SwitchVisualization);
