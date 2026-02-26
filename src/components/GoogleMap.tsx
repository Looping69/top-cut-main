"use client";

import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Image from 'next/image';

// Top Cut location (Kuruman, South Africa coordinates)
const DEFAULT_CENTER = {
  lat: -27.456581,
  lng: 23.431802
};

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
  borderRadius: '0.375rem'
};

// Custom map styles to make it match the site design
const mapStyles = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#2c5834" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#c5e8c0" }, { lightness: 21 }]
  }
];

export function LocationMap() {
  const [mapKey, setMapKey] = useState<string>('');
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  
  useEffect(() => {
    // Get API key from environment variable
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    setMapKey(key);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapKey
  });

  const [map, setMap] = useState<any | null>(null);

  const onLoad = (map: any): void => {
    setMap(map);
  };

  const onUnmount = (): void => {
    setMap(null);
  };

  // Toggle info window visibility
  const handleMarkerClick = () => {
    setShowInfoWindow(prev => !prev);
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 left-0 w-full z-10 bg-[var(--primary-dark)] p-4 rounded-t-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1">
            <Image 
              src="/topcut.png" 
              alt="Top Cut Tree Felling" 
              width={40} 
              height={40} 
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-white font-bold">Top Cut Tree Felling</h3>
            <p className="text-green-100 text-sm">12 Celiers Street, Kuruman, South Africa</p>
          </div>
        </div>
      </div>
      
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={DEFAULT_CENTER}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: mapStyles,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true
          }}
        >
          <Marker
            position={DEFAULT_CENTER}
            title="Top Cut Tree Felling"
            onClick={handleMarkerClick}
            icon={typeof window !== 'undefined' ? {
              url: '/topcut.png',
              scaledSize: new window.google.maps.Size(60, 60),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(30, 30),
            } : undefined}
          >
            {showInfoWindow && (
              <InfoWindow onCloseClick={() => setShowInfoWindow(false)}>
                <div className="p-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Image 
                      src="/topcut.png" 
                      alt="Top Cut" 
                      width={20} 
                      height={20} 
                      className="rounded-full"
                    />
                    <h4 className="font-bold text-sm">Top Cut Tree Felling</h4>
                  </div>
                  <p className="text-xs">12 Celiers Street, Kuruman, South Africa</p>
                  <p className="text-xs text-[var(--primary)]">Tree Felling & Landscaping</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        </GoogleMap>
      ) : (
        <div className="w-full h-full min-h-[400px] bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
          Loading Map...
        </div>
      )}
    </div>
  );
}
