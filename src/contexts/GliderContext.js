import React, {createContext, useEffect, useState} from 'react';
import Endpoints from "../util/Endpoints";
import useInterval from '../hooks/useInterval';

const GliderContext = createContext(null);

const fetchAll = urls => Promise.all(
  urls.map(url => fetch(url)
  .then(r => r.json())
  .then(data => ({ data, url }))
  .catch(error => ({ error, url }))
));







export const GliderProvider = ({children}) => {
  const [gliderState, setGliderState] = useState({
    stops: [],
    timestamp: null
  });


  // Initialize State on mount
  useEffect(() => {
    assignGliderState();
  }, [])

  // reassign State every 60 seconds
  useInterval(() => {
    assignGliderState();
  }, 60000)


  const assignGliderState = () => {
    fetch(Endpoints.STOPS)
    .then(res => res.json())
    .then(newStops => {
      const stopList = newStops.stops;
      const stopUrls = stopList.map(stop => `${Endpoints.STOP_INFO}/${stop.id}`);

      // Retrieve profile data for each Stop
      fetchAll(stopUrls).then(stopDataListRaw => {

        // Parse Raw data, refine to something usable
        const stopData = stopList.map((stop,i) => {
          const {departures} = stopDataListRaw[i].data;
          const {name, id, g1, g2} = stop;

          return {name, id, coords: {lat: stop.lat, lng: stop.lng}, g1, g2, departures};
        });

        // Set the Glider State
        setGliderState({
          stops: stopData,
          currentDateTime: new Date(),
        });
      });

    })
    .catch(e => console.log(e))
  }



  const {stops, currentDateTime} = gliderState;

  const value = {
    isLoading: !currentDateTime,
    stops,
    currentDateTime,
  };

  return (
    <GliderContext.Provider {...{value}}>
      {children}
    </GliderContext.Provider>
  );
}

export default GliderContext;