import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parseRecords } from '../../actions/records';


export class Home extends Component {
  render() {
    const {records, parseRecords} = this.props;
    const { parsing, payload, error } = records;

    return (<div>
      <textarea ref={ node => this.input = node }></textarea>
      <button onClick={() => { parseRecords(this.input.value) }}>Parse</button>
      { parsing ? 'Parsing...' : <pre>{JSON.stringify(payload, null, 2)}</pre> }
    </div>);
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

export default connect(mapStateToProps, mapActionsToProps)(Home);
