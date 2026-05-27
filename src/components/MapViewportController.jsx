import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapViewportController({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    map.flyTo(coordinates, 7, {
      animate: true,
      duration: 1.4
    });
  }, [coordinates, map]);

  return null;
}

export default MapViewportController;
