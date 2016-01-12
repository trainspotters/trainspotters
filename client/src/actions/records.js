'use strict';
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

function parseAFile(rawData) {
  return getRawFromString(rawData)
    .then((rawRecords) => {
      return rawRecords.map(parseRecord);
    });
}

export function parseFiles(filesContent) {
  return (dispatch) => {
    dispatch(recordsParsingStart());
    return Promise.all(
      filesContent.map(parseAFile)
    ).then(function concatAllRecords(recordsPerFile){
      return [].concat(...recordsPerFile);
    }).then((records) => {
      dispatch(recordsParsingSuccess(records));
    })
    .catch((error) => {
      dispatch(recordsParsingFailure(error));
    });
  }
}

export function parseRecords(rawData) {
  return (dispatch) => {

    dispatch(recordsParsingStart());

    return parseAFile(rawData)
      .then((records) => {
        dispatch(recordsParsingSuccess(records));
      })
      .catch((error) => {
        dispatch(recordsParsingFailure(error));
      });
  };
}
