import { useEffect, useState } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import {
  Marker,
  Popup,
  Circle,
  CircleMarker,
  Polyline,
  Polygon,
  Rectangle,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.scss";
import { useData } from "../../hooks/useData";
import AreaComponent from "../Area/Area";
import RouteComponent from "@components/Route/Route";

const { MapContainer, useMapEvents } = ReactLeaflet;

const Map = ({
  children,
  className,
  width,
  height,
  markers,
  setMarkers,
  computeEvent,
  ...rest
}) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
        iconUrl: "leaflet/images/marker-icon.png",
        shadowUrl: "leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  // const { data, isLoading, isError } = useData("http://localhost:8000/");

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error loading data.</p>;

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        if (markers.length < 3) {
          const newMarkers = [...markers, e.latlng];
          setMarkers(newMarkers);
          map.flyTo(e.latlng, map.getZoom());
        }
      },
    });

    return markers.map((position, idx) => (
      <Marker key={idx} position={position}>
        <Popup>{idx === 0 ? "Start" : idx === 1 ? "Waypoint" : "End"}</Popup>
      </Marker>
    ));
  }

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <LayersControl position="topright">
        <LayersControl.Overlay name="Valid Area">
          <AreaComponent />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Custom Routing">
          <LayerGroup>
            <LocationMarker />
          </LayerGroup>
          <LayersControl.Overlay name="Route">
            <RouteComponent computeEvent={computeEvent} markers={markers} />
          </LayersControl.Overlay>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
