import React, { useEffect, useState } from "react";
import { Polygon } from "react-leaflet";
import { useMapLimits } from "../../hooks/useMapLimits";

const AreaComponent = (pathOptions) => {
  const [polylinePoints, setPolylinePoints] = useState([]);
  const { data, isLoading, isError } = useMapLimits();

  useEffect(() => {
    if (data && !isLoading && !isError) {
      // Assuming data contains the polyline points, adjust as needed
      setPolylinePoints(data);
    }
  }, [data, isLoading, isError]);

  return <Polygon pathOptions={pathOptions} positions={polylinePoints} />;
};

export default AreaComponent;
