import React, {useContext} from "react";
import GliderContext from '../contexts/GliderContext';
import GliderMap from "../components/GliderMap";
import * as UI from './Question3UI';

export default function Question3 (props) {
  //Displaying real-time metrics for our devices' locations and statuses is a critical component of our reporting strategy.
  // This allows us to provide accurate, live data to our clients.
  //
  // Using Translink's JourneyPlanner API, implement an MVP in React for a real-time reporting dashboard.
  // What exactly this consists of is up to you, but preferably it will include:
  // - A map component (or a *very* pretty table, lol)
  // - A way to locate/inspect stops
  // - A way to track buses
  // - Information about the routes available
  //
  // As Translink's JourneyPlanner API is supposedly quite complex and undocumented (surprise surprise!) you may find this package useful:
  // https://github.com/McPo/belfast-glider-api-server
  //
  // This file contains the map component and two endpoints to obtain Stop data.


  const {stops, isLoading, currentDateTime} = useContext(GliderContext);


  return (
    <UI.GliderContainer>
      {currentDateTime && <div>{`${currentDateTime.getHours()}:${String(currentDateTime.getMinutes()).padStart(2, "0")}`}</div>}
      <GliderMap
        stops={stops}
        googleMapURL={'https://maps.googleapis.com/maps/api/js?key=AIzaSyBkHRuOEvL8BERtTR0oIB-mw8e0QkMVA2U&v=3.exp&libraries=geometry,drawing,places'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `800px`, margin: 20 }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <UI.GliderLoader {...{isLoading}}>Loading...</UI.GliderLoader>
    </UI.GliderContainer>
  );
}
