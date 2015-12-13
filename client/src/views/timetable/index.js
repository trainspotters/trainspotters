import React, { Component } from 'react';
import { connect } from 'react-redux';

const colors = ["#eeeeee", "#d6e685", "#8cc665", "#44a340", "#1e6823"]

// data = [365 elements, 0 corresponds to today, 1 to yesterday,...]
// data_element = {fill}
// todays_weekday = [0, 7)
const Table = (props) => {
  console.log(props)
  const { data, todaysWeekday } = props;

  // day -> row             , col
  // 0   -> todays_weekday  , ?
  // 364 -> ?               , 0
  // x   -> (todays_weekday-x)%7, ?
  // 364 -> (todays_weekday-364)%7, 0
  // 364 -> todays_weekday, 0
  var cells = []
  var curRow = todaysWeekday
  var curCol = 0
  for (var i = 364; i >= 0; i--) {
    if (data[i]["selected"]) {
      cells.push(
        <rect className="day"
              width="11" height="11"
              x={curCol*13} y={curRow*13}
              fill={data[i]["color"]}
              stroke="#555"
              stroke-width="1px"/>)
    } else {
      cells.push(
        <rect className="day"
              width="11" height="11"
              x={curCol*13} y={curRow*13}
              fill={data[i]["color"]}/>)
    }
    curRow++
    if (curRow == 7) {
      curRow = 0
      curCol++
    }
  }
  return <g>{cells}</g>
}

const Months = () =>
  <g transform="translate(20, 0)">
    <text x="0" y="-5" className="month">Dec</text>
    <text x="52" y="-5" className="month">Jan</text>
    <text x="104" y="-5" className="month">Feb</text>
    <text x="156" y="-5" className="month">Mar</text>
    <text x="221" y="-5" className="month">Apr</text>
    <text x="273" y="-5" className="month">May</text>
    <text x="338" y="-5" className="month">Jun</text>
    <text x="390" y="-5" className="month">Jul</text>
    <text x="442" y="-5" className="month">Aug</text>
    <text x="507" y="-5" className="month">Sep</text>
    <text x="559" y="-5" className="month">Oct</text>
    <text x="611" y="-5" className="month">Nov</text>
  </g>

const WeekDays = () =>
  <g>
    <text text-anchor="middle" className="wday" dx="-10" dy="9">M</text>
    <text text-anchor="middle" className="wday" dx="-10" dy="22" style={{'display' : 'none'}}>T</text>
    <text text-anchor="middle" className="wday" dx="-10" dy="35">W</text>
    <text text-anchor="middle" className="wday" dx="-10" dy="48" style={{'display' : 'none'}}>T</text>
    <text text-anchor="middle" className="wday" dx="-10" dy="61">F</text>
    <text text-anchor="middle" className="wday" dx="-10" dy="74" style={{'display' : 'none'}}>S</text>
    <text text-anchor="middle" className="wday" dx="-10" dy="87">S</text>
  </g>

const tableData = (records, selected) => {
  console.log("records:")
  console.log(records)

  if (records.payload == undefined) {
    return emptyTableData()
  }

  return collectCounts(records.payload).map((count, num) => {
    return {"color" : getColorByCount(count), "selected" : selected[num] == true}
  })
}

const getColorByCount = (count) => {
  if (count == 0) return colors[0]
  if (count <= 2) return colors[1]
  if (count <= 6) return colors[2]
  if (count <= 8) return colors[3]
  return colors[4]
}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
const dateDiffInDays = (a, b) => {
  // Discard the time and time-zone information.
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const collectCounts = (recordsPayload) => {
  var diffToCount = {}
  for (var i = 0; i < 365; i++) diffToCount[i] = 0

  for (var i = 0; i < recordsPayload.length; i++) {
    var diff = dateDiffInDays(recordsPayload[i].startAt, new Date())
    if (diff < 365) {
      diffToCount[diff] = diffToCount[diff] + 1
    }
  }
  var res = []
  for (var i = 0; i < 365; i++) {
    res.push(diffToCount[i])
  }
  return res
}

const emptyTableData = () => {
  var data = []
  for (var i = 0; i < 365; i++) {
    data.push({"color" : colors[0]})
  }
  return data
}

export class TimeTable extends Component {
  render() {
    return (
      <svg width="721" height="110" className="js-calendar-graph-svg">
        <g transform="translate(20, 20)">
          <Table data={tableData(this.props.records, {0: true, 3: true, 364: true})} todaysWeekday={6}/>
          <Months/>
          <WeekDays/>
        </g>
      </svg>
    );
  }
}

function mapStateToProps({records}) {
  return { records };
}

function mapActionsToProps (dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapActionsToProps)(TimeTable);
