import React, {useState} from "react";
import {Marker} from "react-google-maps";
import * as UI from "../questions/Question3UI";

const GliderMarker = ({position, label, departures}) => {

  const [showDepartures, setShowDepartures] = useState(false);

  const handleMouseOver = () => setShowDepartures(true);
  const handleMouseOut = () => setShowDepartures(false);

  const {min_until: nextBusDepartsIn} = departures[0];

  const setColorUrgency = min_until => {
    return min_until <= 10
            ? '#ff0000'
            : min_until <= 30
              ? '#ffff00'
              : '#00ff00';
  }

  const setScaleUrgency = min_until => {
    return min_until <= 10
      ? 1.5
      : min_until <= 30
        ? 1
        : .5;
  }



  const icon  = {
    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
    fillColor: setColorUrgency(nextBusDepartsIn),
    fillOpacity: .6,
    // anchor: new google.maps.Point(0,0),
    strokeWeight: 0,
    scale: setScaleUrgency(nextBusDepartsIn)
  }

  return (
  <div>
    <Marker {...{position, label, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut, icon}}
    />
    {showDepartures && (
      <div>
        <h2>{label} Departures</h2>
        <h3>Next Bus Departs in {nextBusDepartsIn} Minute{nextBusDepartsIn!==1 && 's'}{nextBusDepartsIn<=1 && '!!'}</h3>
        <UI.DepartureTable>
          <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Minutes Remaining</th>
          </tr>
          </thead>
          <tbody>
          {departures.map(({from, to, min_until}, i) => (
            <tr key={`${label}-${i}`}>
              <td>{from}</td>
              <td>{to}</td>
              <td>{min_until}</td>
            </tr>
          ))}
          </tbody>
        </UI.DepartureTable>
      </div>
    )}

  </div>
  )
}

export default GliderMarker;