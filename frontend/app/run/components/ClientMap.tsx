"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Loading from "@/app/components/Loading";

const apiKey = process.env.GOOGLE_MAP_API_KEY || "";

const ClientMap: React.FC = () => {
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true },
      );
    }
  }, []);

  if (!isLoaded || !userLocation) return <Loading width={50} height={50} />;

  return (
    <div
      className="relative w-full flex"
      style={{
        height: `calc(100vh - var(--header-height) - var(--footer-height))`,
      }}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={15}
        center={userLocation}
      >
        <Marker position={userLocation} />
      </GoogleMap>
    </div>
  );
};

export default ClientMap;
