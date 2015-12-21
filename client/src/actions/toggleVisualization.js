'use strict';
export const TOGGLE_DAY_TABLE_VISUALIZATION = 'TOGGLE_DAY_TABLE_VISUALIZATION';

export function toggleDayVisualization() {
  return {
    type: TOGGLE_DAY_TABLE_VISUALIZATION,
  };
}

export function toggleTableDayVisualization() {
  return (dispatch) => {
    dispatch(toggleDayVisualization());
  };
}
