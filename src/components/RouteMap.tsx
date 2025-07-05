'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { client } from '@/utils/client';
import 'leaflet-polylinedecorator';
import 'leaflet-routing-machine';
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
      const sortedPoints = fetchedPoints.sort((a, b) => {
        return parseInt(a.label) - parseInt(b.label);
      });

      setPoints(sortedPoints);
    };

    if (packageId) fetchLocations();
  }, [packageId]);

  return (
    <div className="w-full">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-96"
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
        <MapRoutingControl points={points} />
      </MapContainer>
    </div>
  );
}

function MapRoutingControl({ points }: { points: Point[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 1 && map) {
      const defaultLocation = { coords: [6.9271, 79.8612], label: 'Last', name: 'New Location' };
      const lastPoint = points[points.length - 1];
      const routingControl = L.Routing.control({
        waypoints: [
          ...points.map(p => L.latLng(p.coords[0], p.coords[1])),
          L.latLng(defaultLocation.coords[0], defaultLocation.coords[1]),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: 'green', weight: 4 }],
        },
        show: false,
        createMarker: function() { return null; },
      }).addTo(map);
      const lastToDefaultRoutingControl = L.Routing.control({
        waypoints: [
          L.latLng(lastPoint.coords[0], lastPoint.coords[1]),
          L.latLng(defaultLocation.coords[0], defaultLocation.coords[1]),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: 'green', weight: 4 }],
        },
        show: false,
        createMarker: function() { return null; },
      }).addTo(map);

      return () => {
        map.removeControl(routingControl);
        map.removeControl(lastToDefaultRoutingControl);
      };
    }
  }, [points, map]);
  return null;
}
