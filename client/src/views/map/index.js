import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import stations from '../../../../stations.json';

export class MapStations extends Component {
  render() {
    const position = [51.505, -0.09];
    const markers = stations.map((station) => {
      return <Marker position={[station.lat, station.lng]} key={station.displayName}></Marker>;
    });

    return (
      <Map style={{width: "600px", height: "300px"}} center={position} zoom={13}>
        <TileLayer
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          id='vjo.lc4i086e'
          accessToken='pk.eyJ1IjoidmpvIiwiYSI6ImNiNzVkNjQzMzhhY2VmMDRjMGE5ZDc5NTgwMDM0MTczIn0.rgcheF2XHUXNSx5iFtribw'
        />
        {markers}
      </Map>
    );
  }
}

export default MapStations;
