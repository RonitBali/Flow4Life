import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [location, setLocation] = useState({ lng: 77.209, lat: 28.6139 }); // Delhi loc default 
  const [locationSet, setLocationSet] = useState(false);
  const zoom = 14;
  maptilersdk.config.apiKey = "nSMGNnD9ypkA3BlnB04Q";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          });
          setLocationSet(true);
          console.log("User location:", position.coords);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationSet(true); 
        }
      );
    } else {
      setLocationSet(true);
    }
  }, []);

  useEffect(() => {
    if (map.current || !locationSet) return;
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: "https://api.maptiler.com/maps/streets/style.json?key=nSMGNnD9ypkA3BlnB04Q", 
      center: [location.lng, location.lat],
      zoom: zoom,
    });
    new maptilersdk.Marker({color: "#FF0000"})
      .setLngLat([location.lng,location.lat])
      .addTo(map.current);

  }, [location.lng, location.lat, zoom, locationSet]);

  return (
    <div className="relative w-full h-[calc(100vh-77px)]">
      <div ref={mapContainer} className="absolute w-full h-full" />
    </div>
  );
}

export default Map;
