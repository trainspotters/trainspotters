'use strict';
import React from 'react';
import { journeysTimeInHours } from '../recordsUtils.js'

export const RecordsStat = ({records}) =>
  (<div>
    <div>Journeys cumulative duration: {journeysTimeInHours(records)} hours.</div>
  </div>);
