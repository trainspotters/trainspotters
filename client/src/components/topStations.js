'use strict';

import React, { Component } from 'react';

export class TopStations extends Component {
  render() {
    const { records } = this.props;
    let items = {},
        sorted = [];

    records.forEach((record) => {
      if (record.from.name) {
        if (items[record.from.name]) {
          items[record.from.name]++;
        } else {
          items[record.from.name] = 1;
        }
      }

      if (record.to.name) {
        if (items[record.to.name]) {
          items[record.to.name]++;
        } else {
          items[record.to.name] = 1;
        }
      }
    });

    // Sort stations by most visited one first
    Object.keys(items)
      .map((k) => [k, items[k]])
      .sort((a, b) => b[1] - a[1])
      .forEach((d) => sorted.push({name: d[0], count: d[1]}));

    // top5
    sorted.length = 5;

    return <ul>
      {sorted.map((v) => <li key={v.name}>{v.name} visited {v.count} times</li>)}
    </ul>;
  }
}
