import React, { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { useData } from "src/hooks/useData";

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
];

const limeOptions = { color: "lime" };

const RouteComponent = ({ computeEvent, markers }) => {
  const [apiBody, setApiBody] = useState(null);

  useEffect(() => {
    if (computeEvent && markers && markers.length >= 3) {
      const newApiBody = {
        start: {
          latitude: markers[0].lat,
          longitude: markers[0].lng,
        },
        waypoint: {
          latitude: markers[1].lat,
          longitude: markers[1].lng,
        },
        end: {
          latitude: markers[2].lat,
          longitude: markers[2].lng,
        },
      };

      setApiBody(newApiBody);
      console.log("compute event received", computeEvent);
      console.log(newApiBody);
    }
  }, [computeEvent, markers]);

  const url = "http://localhost:8000/navigation/crow";
  const { data, isLoading, isError } = useData(url, "POST", apiBody);
  console.log(data);

  return <Polyline pathOptions={limeOptions} positions={polyline} />;
};

export default RouteComponent;
