'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { client } from '@/utils/client';
import 'leaflet-polylinedecorator';
import 'leaflet-routing-machine'; // Import the routing machine
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

type Point = {
  id: string;
  coords: [number, number];
  label: string;
  name: string;
};

function makeNumberIcon(label: string) {
  return L.divIcon({
    html: `<div class="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold">${label}</div>`,
    className: ''
  });
}

type RouteMapProps = {
  packageId: string;
};

export default function RouteMap({ packageId }: RouteMapProps) {
  const center: [number, number] = [7.5, 80.0];
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await client.fetch(
        `*[_type == "travelPackage" && id == $packageId][0]{
          locations[] {
            locationId,
            locationName,
            map { lat, lng }
          }
        }`,
        { packageId }
      );

      const fetchedPoints: Point[] = data?.locations?.map((loc: any, index: number) => ({
        id: loc.locationId || `loc-${index}`,
        coords: [loc.map.lat, loc.map.lng],
        label: (index + 1).toString(),
        name: loc.locationName,
      })) || [];

      // Sort the points based on locationId
      const sortedPoints = fetchedPoints.sort((a, b) => a.id.localeCompare(b.id));

      setPoints(sortedPoints);
    };

    if (packageId) fetchLocations();
  }, [packageId]);

  return (
    <div className="w-full">
      {/* Map display only with custom height */}
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-96"  // Change the height here (e.g., h-96 for 24rem height)
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map(({ id, coords, label, name }) => (
          <Marker key={id} position={coords} icon={makeNumberIcon(label)}>
            <Popup>{name}</Popup>
          </Marker>
        ))}

        {/* Routing logic */}
        <MapRoutingControl points={points} />
      </MapContainer>
    </div>
  );
}

// A new component that manages routing logic
function MapRoutingControl({ points }: { points: Point[] }) {
  const map = useMap(); // This provides the Leaflet map instance

  useEffect(() => {
    if (points.length > 1 && map) {
      // Create a loop by adding the first point again at the end of the points array
      const loopedPoints = [...points, points[0]]; // Adding points[0] at the end to make a loop

      const routingControl = L.Routing.control({
        waypoints: loopedPoints.map(p => L.latLng(p.coords[0], p.coords[1])),
        routeWhileDragging: true, // Enable dragging for routing
        lineOptions: {
          styles: [{ color: 'green', weight: 4 }],
        },
        // Disable the directions box and itinerary
        show: false,
        createMarker: function() { return null; }, // Prevent adding markers on route
      }).addTo(map);

      return () => {
        // Clean up the routing control when the component is unmounted or points change
        map.removeControl(routingControl);
      };
    }
  }, [points, map]); // The effect will re-run when points or map change

  return null; // This component does not render anything
}
