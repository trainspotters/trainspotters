'use strict';
import {
  DAY_CLICKED,
} from '../actions/selectedDays';

const initialState = new Set();

export default function selectedDays(state = initialState, {type, day}) {
  switch (type) {
    case DAY_CLICKED:
      const newState = new Set(state);
      if (state.has(day)) {
        newState.delete(day);
      } else {
        newState.add(day);
      }
      return newState;
    default:
      return state;
  }
};
