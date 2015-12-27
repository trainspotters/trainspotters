'use strict';

import React, { Component } from 'react';
import { Map, Polyline, TileLayer } from 'react-leaflet';
import { isLegalTwoSidedJourney, similarJourneysColorFunction } from '../recordsUtils.js'

export class MapStations extends Component {
  render() {
    const { records } = this.props;
    const position = [51.505, -0.09];

    const newRecords = records
      .filter(isLegalTwoSidedJourney)
      .filter(({to, from}) => {
        // only keep records that can be mapped
        return to.lat && to.lng && from.lat && from.lng;
      })
      .map((record) => {
        let similar_journeys = 0;

        records.forEach(({to, from}) => {
          if((record.to.lat === to.lat || record.to.lat === from.lat) &&
             (record.to.lng === to.lng || record.to.lng === from.lng) &&
             (record.from.lat === to.lat || record.from.lat === from.lat) &&
             (record.from.lng === to.lng || record.from.lng === from.lng)) {
            similar_journeys += 1;
          }
        });

        return {
          similar_journeys,
          ...record
        };
      });

    const markers = newRecords.map((station) => {
      return (<Polyline
        positions={[
          [station.from.lat, station.from.lng],
          [station.to.lat, station.to.lng]
        ]}
        color={similarJourneysColorFunction(station.similar_journeys)}
        opacity={1}
        weight={3}
        key={station.startAt}
        />);
    });

    return (
      <Map style={{width: "100%", height: "500px"}} center={position} zoom={12}>
        <TileLayer
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          id='vjo.ofhbpcpo'
          accessToken='pk.eyJ1IjoidmpvIiwiYSI6ImNpaWRwb3RjbjAwMHl3MGtycXQ0eGVpY2UifQ.Tiu_2hkkMkFXWJKupI4iaw'
        />
        { markers }
      </Map>
    );
  }
}
