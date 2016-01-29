'use strict';
import React from 'react';
import { connect } from 'react-redux';
import {
  metricSystem,
  imperialSystem,
} from '../actions/toggleUnitSystem';


const SwitchUnitSystem = ({metricSystem, imperialSystem, toggleUnitSystem}) => {
  const { metric, imperial } = toggleUnitSystem;

  return (
    <div className="switch switch-toggle--system">
      <input
        id={"unit1"}
        type={"radio"}
        checked={metric}
        onChange={() => { metricSystem() }}
      />
      <label
        htmlFor={"unit1"}
        name={"toggleUnitSystem"}
      >Metric system</label>
      <input
        id={"unit2"}
        type={"radio"}
        checked={imperial}
        onChange={() => { imperialSystem() }}
      />
      <label
        htmlFor={"unit2"}
        name={"toggleUnitSystem"}
      >Imperial system</label>
    </div>
  );
};

function mapStateToProps({toggleUnitSystem}) {
  return {
    toggleUnitSystem,
  };
}

function mapActionsToProps(dispatch) {
  return {
    metricSystem: () => dispatch(metricSystem()),
    imperialSystem: () => dispatch(imperialSystem()),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(SwitchUnitSystem);
