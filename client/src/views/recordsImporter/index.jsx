'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { parseRecords } from '../../actions/records';
import RecordList from '../../components/recordList';


export class RecordsImporter extends Component {
  render() {
    const { records, parseRecords } = this.props;
    const { parsing } = records;

    return (<div>
      <textarea ref={ node => this.input = node }></textarea>
      <button onClick={() => { parseRecords(this.input.value) }}>Parse</button>
      { parsing ? <div>Parsing...</div> : ''}
      { this.renderError() }
    </div>);
  }
  renderError() {
    const { records } = this.props;
    const { error, payload } = records;
    if (error) return <pre>{payload}</pre>;
  }
  renderRecords() {
    const { records } = this.props;
    const { error, payload } = records;
    if (!error && payload) return <RecordList records={ payload }></RecordList>;
  }
}

function mapStateToProps({records}) {
  return { records };
}

function mapActionsToProps (dispatch) {
  return {
    parseRecords: (records) => dispatch(parseRecords(records)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(RecordsImporter);
