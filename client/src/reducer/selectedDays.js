'use strict';
import {
  DAY_CLICKED,
} from '../actions/selectedDays';

const initialState = {
  selected: new Set(),
};

export default function selectedDays(state = initialState, {type, payload}) {
  switch (type) {
    case DAY_CLICKED:
      if (state.selected.has(payload)) {
        state.selected.delete(payload);
      } else {
        state.selected.add(payload);
      }
      return {
        selected: state.selected
      };
    default:
      return state;
  }
};
