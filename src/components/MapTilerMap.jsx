import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const taxiIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [50, 50],
});

const getRandomNearbyLocation = (lat, lng, radius = 0.01) => {
  const randomLat = lat + (Math.random() - 0.5) * radius;
  const randomLng = lng + (Math.random() - 0.5) * radius;
  return { lat: randomLat, lng: randomLng };
};

const Routing = ({ from, to }) => {
  const map = useMapEvents({
    click() {
      L.Routing.control({
        waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
        createMarker: function() { return null; },
      }).on("routesfound", function (e) {
          const routes = e.routes;
          console.log(routes);
          const route = routes[0].coordinates.map(coord => [coord.lat, coord.lng]);
          L.polyline(route, { color: 'blue' }).addTo(map);
        })
        .addTo(map);
    },
  });

  return null;
};

const MapTilerMap = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [randomLocation, setRandomLocation] = useState(null);

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ lat: latitude, lng: longitude });
            setRandomLocation(getRandomNearbyLocation(latitude, longitude));
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }
    };

    updateLocation();
    const intervalId = setInterval(updateLocation, 20000); 

    return () => clearInterval(intervalId);
  }, []);

  if (!currentLocation || !randomLocation) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={currentLocation} zoom={14} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='Leaflet &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <Marker position={currentLocation} icon={taxiIcon} />
      <Marker position={randomLocation} icon={taxiIcon} />
      <Routing from={currentLocation} to={randomLocation} />
    </MapContainer>
  );
};

export default MapTilerMap;
