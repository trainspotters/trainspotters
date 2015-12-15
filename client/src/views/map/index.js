'use strict';

import React, { Component } from 'react';
import { Map, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import stations from '../../../../stations.json';

export class MapStations extends Component {
  render() {
    const { records } = this.props;
    const position = [51.505, -0.09];

    if(records.payload) {
      const newrecords = records.payload.map((record) => {
        for(const i in stations) {
          if(stations[i].names.indexOf(record.from) > -1) {
              record.from_lat = stations[i].lat;
              record.from_lng = stations[i].lng;
          }
          if(stations[i].names.indexOf(record.to) > -1) {
              record.to_lat = stations[i].lat;
              record.to_lng = stations[i].lng;
          }
        }
        return record;
      });

      const markers = newrecords.map((station) => {
        if(station.from_lat && station.from_lng && station.to_lat && station.to_lng) {
          return (
            <Polyline positions={[[station.from_lat, station.from_lng],[station.to_lat, station.to_lng]]} key={station.startAt}/>
          );
        }
      });
    }

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

function mapStateToProps({records}) {
  return { records };
}

function mapActionsToProps (dispatch) {
  return {
    parseRecords: (records) => dispatch(parseRecords(records)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(MapStations);
