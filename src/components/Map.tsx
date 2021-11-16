import React, { useState, useEffect, ChangeEvent } from "react";

import ReactMapGL, {
  GeolocateControl,
  Marker,
  ViewportProps,
} from "react-map-gl";

// import ReportModal from "./ReportModal";
import "mapbox-gl/dist/mapbox-gl.css";

import { ICity, IDumpster } from "../Interfaces";
const accessToken =
  "pk.eyJ1IjoibGVnaWxhbWFscyIsImEiOiJja21kNnp5dmEyaWl4MnVwMWNleDN3enhkIn0.TOMWAu7ep733glbYBZFSxA";
const geolocateControlStyle = {
  right: 10,
  top: 10,
};
function Map() {
  const [viewport, setViewport] = React.useState<ViewportProps>({
    latitude: 46.48293196437044,
    longitude: 2.483833000000004,
    zoom: 5,
  });
  const [cities, setCities] = useState<Array<ICity>>([]);
  const [city, setCity] = useState<string>("");
  const [dumpsters, setDumpsters] = useState<Array<IDumpster>>();

  //Fetch Cities
  useEffect(() => {
    async function fetchCities() {
      await fetch("http://localhost:8000/api/cities")
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setCities(result);
        });
    }
    fetchCities();
  }, []);

  useEffect(() => {
    if (city != "") {
      fetchDumpsters();
    }
  }, [city]);

  async function fetchDumpsters() {
    //Get city coordinate and move map center
    console.log("let's city coords");
    await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        city + ", France"
      }.json?limit=1&access_token=pk.eyJ1IjoibGVnaWxhbWFscyIsImEiOiJja21kNnp5dmEyaWl4MnVwMWNleDN3enhkIn0.TOMWAu7ep733glbYBZFSxA`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result : ", result);
        const coords = result.features[0].center;
        setViewport({ latitude: coords[1], longitude: coords[0], zoom: 15 });
      });
    console.log("let's fetch dumpsters");
    await fetch(`http://localhost:8000/api/dumpsters/${city}`)
      .then((response) => response.json())
      .then((result) => {
        setDumpsters(result);
      });
  }
  function selectChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
    setCity(event.target.value);
  }
  // Only rerender markers if dumpsters has changed
  const markers = React.useMemo(() => {
    if (dumpsters) {
      dumpsters.map((dumpster) => (
        <Marker
          key={dumpster.id}
          longitude={dumpster.lng}
          latitude={dumpster.lat}
        >
          <div>You are here</div>
        </Marker>
      ));
    }
  }, [dumpsters]);
  return (
    <div className="Map">
      <select
        name="city"
        id="citySelector"
        className="citySelector"
        onChange={selectChangeHandler}
      >
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option value={city.toString()} key={city.toString()}>
            {city}
          </option>
        ))}
      </select>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        width="100%"
        height="100%"
        onViewportChange={(viewport: ViewportProps) => setViewport(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {markers}
      </ReactMapGL>
    </div>
  );
}

export default Map;
