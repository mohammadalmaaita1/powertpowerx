'use client';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import React from 'react';
import type { Tower } from "@/lib/types";

interface TowerMapProps {
    towers: Tower[];
    center?: { lat: number; lng: number };
    zoom?: number;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
};

// Default center (Amman, Jordan)
const defaultCenter = {
  lat: 31.9539,
  lng: 35.9106
};

const statusColors = {
    normal: "green",
    warning: "yellow",
    critical: "red",
};

export default function TowerMap({ towers, center = defaultCenter, zoom = 7 }: TowerMapProps) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    });

    const [selectedTower, setSelectedTower] = React.useState<Tower | null>(null);

    const mapOptions = {
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
        disableDefaultUI: true,
        zoomControl: true,
    };

    if (loadError) {
        return <div>Map cannot be loaded right now. Please ensure your Google Maps API key is correct and billing is enabled.</div>;
    }

    if (!isLoaded) {
        return <div className="flex items-center justify-center h-full">Loading Map...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            options={mapOptions}
        >
            {towers.map(tower => (
                <MarkerF
                    key={tower.id}
                    position={{ lat: tower.latitude, lng: tower.longitude }}
                    onClick={() => setSelectedTower(tower)}
                    icon={{
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: statusColors[tower.status],
                        fillOpacity: 1,
                        strokeWeight: 1,
                        strokeColor: '#ffffff'
                    }}
                />
            ))}

            {selectedTower && (
                <InfoWindowF
                    position={{ lat: selectedTower.latitude, lng: selectedTower.longitude }}
                    onCloseClick={() => setSelectedTower(null)}
                >
                    <div className="bg-background text-foreground p-2 rounded-lg shadow-lg">
                        <h3 className="font-bold">{selectedTower.name}</h3>
                        <p className="capitalize text-sm">Status: {selectedTower.status}</p>
                    </div>
                </InfoWindowF>
            )}
        </GoogleMap>
    );
}
