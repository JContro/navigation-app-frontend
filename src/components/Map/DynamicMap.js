import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { Marker, Popup, Circle, CircleMarker, Polyline, Polygon, Rectangle, LayersControl, LayerGroup } from 'react-leaflet'; 
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';
import { useData } from '../../hooks/useData';

const { MapContainer, useMapEvents } = ReactLeaflet;

const Map = ({ children, className, width, height, ...rest }) => {

  

  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }
  

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



  const { data, isLoading, isError } = useData();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;


  const center = data;

  function LocationMarker() {
    const [markers, setMarkers] = useState([]);
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
        <Popup>{idx === 0 ? 'Start' : idx === 1 ? 'End' : 'Waypoint'}</Popup>
      </Marker>
    ));
  }

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
      <LayersControl position="topright">
        <LocationMarker />
        <LayersControl.Overlay name="Circle">
          <LayerGroup>
            <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
            <CircleMarker center={data} pathOptions={redOptions} radius={20}>
              <Popup>Popup in CircleMarker</Popup>
            </CircleMarker>
          </LayerGroup>
        </LayersControl.Overlay>
        
        <Polyline pathOptions={limeOptions} positions={polyline} />
        <Polyline pathOptions={limeOptions} positions={multiPolyline} />
        <Polygon pathOptions={purpleOptions} positions={polygon} />
        <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
        <Rectangle bounds={rectangle} pathOptions={blackOptions} />
      </LayersControl>
      
    </MapContainer>
  )
}

export default Map;
