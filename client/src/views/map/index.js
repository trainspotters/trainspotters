import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import stations from '../../../../stations.json';

export class MapStations extends Component {
  render() {
    const markers = stations.map((station) => {
      return <Marker position={[station.lat, station.lng]}></Marker>;
    });

    return (
      <Map style={{width: "300px", height: "300px"}} center={position} zoom={13}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers}
      </Map>
    );
  }
}

export default MapStations;
