'use strict';

import React, { Component } from 'react';
import { Map, Polyline, TileLayer } from 'react-leaflet';
import { getCoordinateByName } from '../utils';
import stations from '../../../stations.json';
import { isLegalTwoSidedJourney, similarJourneysColorFunction } from '../recordsUtils.js'

export class MapStations extends Component {
  render() {
    const { records } = this.props;
    const position = [51.505, -0.09];

    const newRecords = records
      .filter(isLegalTwoSidedJourney)
      .map((record) => {
        const to = getCoordinateByName(record.to) || {};
        const from = getCoordinateByName(record.from) || {};

        return {
          to_lat: to.lat,
          to_lng: to.lng,
          from_lat: from.lat,
          from_lng: from.lng,
          ...record
        };
      })
      .filter(({to_lat, to_lng, from_lat, from_lng}) => {
        // only keep records that can be mapped
        return to_lat && to_lng && from_lat && from_lng;
      })

    const finalRecords = newRecords
      .map((record) => {
        let similar_journeys = 0;

        newRecords.forEach(({to_lat, to_lng, from_lat, from_lng}) => {
          if((record.to_lat === to_lat || record.to_lat === from_lat) &&
             (record.to_lng === to_lng || record.to_lng === from_lng) &&
             (record.from_lat === to_lat || record.from_lat === from_lat) &&
             (record.from_lng === to_lng || record.from_lng === from_lng)) {
            similar_journeys += 1;
          }
        });

        return {
          similar_journeys,
          ...record
        };
      });

    const markers = finalRecords.map((station) => {
      return (<Polyline
        positions={[
          [station.from_lat, station.from_lng],
          [station.to_lat, station.to_lng]
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
          id='vjo.lc4i086e'
          accessToken='pk.eyJ1IjoidmpvIiwiYSI6ImNiNzVkNjQzMzhhY2VmMDRjMGE5ZDc5NTgwMDM0MTczIn0.rgcheF2XHUXNSx5iFtribw'
        />
        { markers }
      </Map>
    );
  }
}
