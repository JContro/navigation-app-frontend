import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { Marker, Popup, Circle, CircleMarker, Polyline, Polygon, Rectangle } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { MapContainer, useMapEvents } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }
  const center = [51.505, -0.09]

  const polyline = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]

  const multiPolyline = [
    [
      [51.5, -0.1],
      [51.5, -0.12],
      [51.52, -0.12],
    ],
    [
      [51.5, -0.05],
      [51.5, -0.06],
      [51.52, -0.06],
    ],
  ]

  const polygon = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12],
  ]

  const multiPolygon = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13],
    ],
    [
      [51.51, -0.05],
      [51.51, -0.07],
      [51.53, -0.07],
    ],
  ]

  const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
  ]

  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <LocationMarker />
      <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
      <CircleMarker center={[51.51, -0.12]} pathOptions={redOptions} radius={20}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
      <Polyline pathOptions={limeOptions} positions={polyline} />
      <Polyline pathOptions={limeOptions} positions={multiPolyline} />
      <Polygon pathOptions={purpleOptions} positions={polygon} />
      <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
      <Rectangle bounds={rectangle} pathOptions={blackOptions} />
    </MapContainer>
  )
}

export default Map;
