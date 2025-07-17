'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import whole MapContainer AFTER window is available
const Map = dynamic(() => import('./RouteMap'), { ssr: false });
interface MapWrapperProps {
  packageId: string;
}
export default function MapWrapper({packageId}:MapWrapperProps) {
  console.log("id in map wrap",packageId);
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading map...</div>;
  }

  return <Map packageId={packageId}/>;
}
