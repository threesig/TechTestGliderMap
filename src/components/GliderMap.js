import React, { useState } from 'react';
import GliderMarker from "./GliderMarker";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
const BELFAST_DEFAULT_LOCATION = {
  lat: 54.607868,
  lng: -5.926437
}

const GliderMap = withScriptjs(withGoogleMap(props => {
  const {stops} = props;
  return (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={BELFAST_DEFAULT_LOCATION}
      height={500}
    >
      {stops.map(stop => (
        <GliderMarker key={stop.id} stopId={stop.id} position={stop.coords} label={stop.name} departures={stop.departures} />
      ))}
    </GoogleMap>
  )
}))

export default GliderMap;
