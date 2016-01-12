'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { parseFiles } from '../actions/records';
import MultiwayTextInput from '../components/multiwayTextInput';

class RecordsImporter extends Component {
  render() {
    const { records, parseFiles } = this.props;
    const { parsing } = records;

    return <MultiwayTextInput onTexts={parseFiles}/>
  }
  renderError() {
    const { records } = this.props;
    const { error, payload } = records;
    if (error) return <pre>{payload}</pre>;
  }
}

function mapStateToProps({records}) {
  return { records };
}

function mapActionsToProps (dispatch) {
  return {
    parseFiles: (files) => dispatch(parseFiles(files)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(RecordsImporter);
