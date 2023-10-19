import React, { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import { useMapLimits } from '../../hooks/useMapLimits';

const limeOptions = { color: 'lime' }

const RouteComponent = () => {
  const [polylinePoints, setPolylinePoints] = useState([]);
  const { data, isLoading, isError } = useMapLimits();

  useEffect(() => {
    if (data && !isLoading && !isError) {
      // Assuming data contains the polyline points, adjust as needed
      setPolylinePoints(data);
    }
  }, [data, isLoading, isError]);

  

  return (
    <Polyline pathOptions={limeOptions} positions={polylinePoints} />
  );
};

export default RouteComponent;
