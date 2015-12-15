'use strict';
import {
  RECORDS_PARSING_START,
  RECORDS_PARSING_SUCCESS,
  RECORDS_PARSING_FAILURE,
} from '../actions/records';

const initialState = {
  error: false,
  parsing: false,
  payload: null,
};

export default function records(state = initialState, {type, payload}) {
  switch (type) {
    case RECORDS_PARSING_START:
      return {
        error: false,
        parsing: true,
      };
    case RECORDS_PARSING_SUCCESS:
      return {
        error: false,
        parsing: false,
        payload,
      };
    case RECORDS_PARSING_FAILURE:
      return {
        error: true,
        parsing: false,
        payload,
      };
    default:
      return state;
  }
};
