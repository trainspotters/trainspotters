'use strict';
import React from 'react';
import { normalizeWeekday, dateDiffInDays } from '../utils.js';
import { journeysTimeInHours } from '../journeysUtils.js';

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

const tableData = (journeys, selected, daysToShow, colorFunction) => {
  return groupJourneys(journeys, daysToShow).map((journeys, num) => {
    return {
      "color" : colorFunction(journeys),
      "selected" : selected.has(num)
    };
  })
}

const groupJourneys = (journeys, daysToShow) => {
  const groupedJourneys = Array.from(new Array(daysToShow), () => []);
  const now = new Date();
  for (const i in journeys) {
    const diff = dateDiffInDays(journeys[i].startAt, now);
    if (diff < daysToShow) {
      groupedJourneys[diff].push(journeys[i]);
    }
  }
  return groupedJourneys;
}

export const PerDayTable = ({journeys, selectedDays, clickDay, colorFunction}) =>
  (<svg width="721" height="110" className="js-calendar-graph-svg">
    <g transform="translate(20, 20)">
      <Table
        daysToShow={DAYS_TO_SHOW}
        cellSize={CELL_SIZE}
        cellPadding={CELL_PADDING}
        data={tableData(journeys, selectedDays, DAYS_TO_SHOW, colorFunction)}
        todaysWeekday={normalizeWeekday((new Date()).getDay()-1)}
        clickDay={clickDay}/>
      <Months/>
      <WeekDays/>
    </g>
  </svg>)

export const whiteColorFunction = (journeys) => "#eeeeee";
export const journeysPerDayColorFunction = (journeys) => {
  const count = journeys.length;
  if (count == 0) return COLORS[0];
  if (count <= 2) return COLORS[1];
  if (count <= 6) return COLORS[2];
  if (count <= 8) return COLORS[3];
  return COLORS[4];
}
export const journeysTimePerDayColorFunction = (journeys) => {
  const time = journeysTimeInHours(journeys);
  if (time == 0) return COLORS[0];
  if (time <= 0.5) return COLORS[1];
  if (time <= 1) return COLORS[2];
  if (time <= 2) return COLORS[3];
  return COLORS[4];
}
