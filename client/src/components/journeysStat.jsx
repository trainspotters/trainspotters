'use strict';
import React from 'react';
import { journeysTimeInHours } from '../journeysUtils.js'

export const JourneysStat = ({journeys}) =>
  (<div>
    <div>Journeys cumulative duration: {journeysTimeInHours(journeys)} hours.</div>
  </div>);
