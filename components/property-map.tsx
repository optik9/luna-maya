"use client"

import { useEffect, useRef, useState } from 'react';
import Image from "next/image"

// Variable global para rastrear si el script ya se cargó
declare global {
  interface Window {
    googleMapsLoaded?: boolean;
  }
}

export default function PropertyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [mapError, setMapError] = useState(false);

  const initializeMap = () => {
    if (!mapRef.current || !window.google || !window.google.maps) {
      setMapError(true);
      return;
    }

    try {
      const location = { 
        lat: 20.629558, 
        lng: -87.073885 
      }; // Coordenadas de Luna Maya Condominios

      const map = new google.maps.Map(mapRef.current, {
        center: location,
        zoom: 16,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new google.maps.Marker({
        position: location,
        map: map,
        title: "Luna Maya Condominios",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; font-size: 16px;">Luna Maya Condominios</h3>
            <p style="margin: 0; font-size: 14px;">
              Cozumel Mz 162-Lote 1, Zazil-ha<br>
              77710 Playa del Carmen, Q.R., México
            </p>
          </div>
        `
      });

      markerRef.current.addListener("click", () => {
        infoWindow.open(map, markerRef.current);
      });

      infoWindow.open(map, markerRef.current);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(true);
    }
  };

  useEffect(() => {
    // Verificar si el script ya está cargado
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Verificar si ya estamos cargando el script
    if (window.googleMapsLoaded) return;
    window.googleMapsLoaded = true;

    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqG80lHMXSoMOzYBZ-rWVX8uZlSgdb4WQ&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      script.onerror = () => {
        setMapError(true);
        window.googleMapsLoaded = false;
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, []);

  if (mapError) {
    return (
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-md">
        <Image
          src="/placeholder.svg?height=400&width=800&text=Mapa+no+disponible"
          alt="Mapa de ubicación no disponible"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}