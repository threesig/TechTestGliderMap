import React, {useState} from "react";
import {Marker} from "react-google-maps";
import * as UI from "../questions/Question3UI";

const GliderMarker = ({position, label, departures}) => {

  const [showDepartures, setShowDepartures] = useState(false);

  const handleMouseOver = () => setShowDepartures(true);
  const handleMouseOut = () => setShowDepartures(false);

  return (
  <div>
    <Marker {...{position, label, onMouseOver: handleMouseOver, onMouseOut: handleMouseOut}} />
    {showDepartures && (
      <div>
        <h2>{label} Departures</h2>
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