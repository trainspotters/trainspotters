import { getRawFromString, parseRecord } from 'trainspotters-parser';

export const RECORDS_PARSING_START = 'RECORDS_PARSING_START';
export const RECORDS_PARSING_SUCCESS = 'RECORDS_PARSING_SUCCESS';
export const RECORDS_PARSING_FAILURE = 'RECORDS_PARSING_FAILURE';

export function recordsParsingStart() {
  return {
    type: RECORDS_PARSING_START,
  };
}
export function recordsParsingSuccess(records) {
  return {
    type: RECORDS_PARSING_SUCCESS,
    payload: records,
  };
}

export function recordsParsingFailure(error) {
  return {
    type: RECORDS_PARSING_FAILURE,
    payload: error,
  };
}

export function parseRecords(rawData) {
  return (dispatch) => {

    dispatch(recordsParsingStart());

    getRawFromString(rawData)
      .then((rawRecords) => {
        return rawRecords.map(parseRecord);
      })
      .then((records) => {
        dispatch(recordsParsingSuccess(records));
      })
      .catch((error) => {
        dispatch(recordsParsingFailure(error));
      });
  };
}
