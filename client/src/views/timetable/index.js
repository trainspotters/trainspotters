'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickDay } from '../../actions/selectedDays.js';
import { repeat, normalizeWeekday, dateDiffInDays } from '../../utils.js';
import RecordList from '../../components/recordList';

const COLORS = ["#eeeeee", "#d6e685", "#8cc665", "#44a340", "#1e6823"];
const DAYS_TO_SHOW = 366;
const CELL_SIZE = 11;
const CELL_PADDING = 2;

// daysToShow how many days to show
// data [daysToShow elements, 0 corresponds to today, 1 to yesterday,...]
// each data element looks like {"fill": "#eeeeee", "selected": "true"}
// todaysWeekday from 0 to 6 inclusive
const Table = ({ daysToShow, cellSize, cellPadding, data, todaysWeekday, clickDay }) => {
  // day                   -> row                  , col
  // 0                     -> todaysWeekday        , ?
  // daysToShow-1          -> ?                    , 0
  // x                     -> (todaysWeekday-x)%7 , ?
  // daysToShow-1          -> (todaysWeekday-(daysToShow-1))%7, 0
  let cells = [];
  let curRow = normalizeWeekday(todaysWeekday-(daysToShow-1));
  let curCol = 0;
  for (let i = daysToShow - 1; i >= 0; i--) {
    const selectedProps = data[i]["selected"] ? {
      "stroke": "#555",
      "strokeWidth": "1px"
    } : {};
    cells.push(<rect className="day"
          key={i}
          width={cellSize} height={cellSize}
          x={curCol*(cellSize+cellPadding)} y={curRow*(cellSize+cellPadding)}
          fill={data[i]["color"]}
          {...selectedProps}
          onClick={() => { clickDay(i) }}/>);
    curRow++;
    if (curRow == 7) {
      curRow = 0;
      curCol++;
    }
  }

  return (
    <g>{cells}</g>
  );
}

const Months = () => (
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
)

const WeekDays = () => (
  <g>
    <text textAnchor="middle" className="wday" dx="-10" dy="9">M</text>
    <text textAnchor="middle" className="wday" dx="-10" dy="22" style={{'display' : 'none'}}>T</text>
    <text textAnchor="middle" className="wday" dx="-10" dy="35">W</text>
    <text textAnchor="middle" className="wday" dx="-10" dy="48" style={{'display' : 'none'}}>T</text>
    <text textAnchor="middle" className="wday" dx="-10" dy="61">F</text>
    <text textAnchor="middle" className="wday" dx="-10" dy="74" style={{'display' : 'none'}}>S</text>
    <text textAnchor="middle" className="wday" dx="-10" dy="87">S</text>
  </g>
)

const tableData = (records, selected, daysToShow) => {
  let data;
  if (records.payload != undefined) {
    data = collectCounts(records.payload, daysToShow);
  } else {
    data = repeat(0, daysToShow)
  }

  return data.map((count, num) => {
    return {
      "color" : getColorByCount(count),
      "selected" : selected.has(num)
    };
  })
}

const getColorByCount = (count) => {
  if (count == 0) return COLORS[0];
  if (count <= 2) return COLORS[1];
  if (count <= 6) return COLORS[2];
  if (count <= 8) return COLORS[3];
  return COLORS[4];
}

const collectCounts = (recordsPayload, daysToShow) => {
  const counts = repeat(0, daysToShow);
  const now = new Date();
  for (const i in recordsPayload) {
    const diff = dateDiffInDays(recordsPayload[i].startAt, now);
    if (diff < daysToShow) {
      counts[diff] = counts[diff] + 1;
    }
  }
  selectedJourneys()
  return counts;
}

const selectedJourneys = (records, selected) => {
  if (!records || !records.payload) {
    return [];
  }
  const now = new Date();
  return records.payload.filter((journey) => {
    const diff = dateDiffInDays(journey.startAt, now);
    return selected.has(diff);
  });
}

const TimeTable = ({records, selectedDays, clickDay}) =>
  (<div>
    <svg width="721" height="110" className="js-calendar-graph-svg">
      <g transform="translate(20, 20)">
        <Table
          daysToShow={DAYS_TO_SHOW}
          cellSize={CELL_SIZE}
          cellPadding={CELL_PADDING}
          data={tableData(records, selectedDays, DAYS_TO_SHOW)}
          todaysWeekday={normalizeWeekday((new Date()).getDay()-1)}
          clickDay={clickDay}/>
        <Months/>
        <WeekDays/>
      </g>
    </svg>
    <RecordList records={selectedJourneys(records, selectedDays)}/>
  </div>)

function mapStateToProps({records, selectedDays}) {
  return { records, selectedDays };
}

function mapActionsToProps (dispatch) {
  return {
    clickDay: (day) => dispatch(clickDay(day)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(TimeTable);
