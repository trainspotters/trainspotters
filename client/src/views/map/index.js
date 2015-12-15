'use strict';

import React, { Component } from 'react';
import { Map, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import stations from '../../../../stations.json';

export class MapStations extends Component {

  getGeo(name) {
    for(const i in stations) {
      if(stations[i].names.indexOf(name) > -1) {
        return {lat: stations[i].lat, lng: stations[i].lng}
      }
    }
    console.log(name);
    return {};
  }

  render() {
    const { records } = this.props;
    const position = [51.505, -0.09];
    let markers;

    if(records.payload) {
      const newrecords = records.payload.map((record) => {
        const to = this.getGeo(record.to);
        record.to_lat = to.lat;
        record.to_lng = to.lng;

        const from = this.getGeo(record.from);
        record.from_lat = from.lat;
        record.from_lng = from.lng;

        return record;
      });

      markers = newrecords.map((station) => {
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
