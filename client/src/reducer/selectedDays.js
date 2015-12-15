import {
  DAY_CLICKED,
} from '../actions/selectedDays';

const initialState = {
  selected: {},
};

export default function selectedDays(state = initialState, {type, payload}) {
  switch (type) {
    case DAY_CLICKED:
      if (state.selected[payload] == true) {
        state.selected[payload] = undefined
      } else {
        state.selected[payload] = true
      }
      return {
        selected: state.selected
      };
    default:
      return state;
  }
};
