'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { client } from '@/utils/client';


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
console.log("id in route map",packageId);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await client.fetch(
        `*[_type == "travelPackage" && id == $packageId][0]{
          locations[]{
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

      setPoints(fetchedPoints);
    };

    if (packageId) fetchLocations();
  }, [packageId]);

  const routes = points.length > 1
    ? points.slice(1).map(p => [points[0].coords, p.coords])
    : [];

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={false}
        className="w-full h-full"
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

        {routes.map((positions, i) => (
          <Polyline
            key={i}
            positions={positions}
            pathOptions={{ color: 'green', weight: 4 }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
