"use client";

import React, { FC, useEffect, useState } from "react";
import StayCard2 from "@/components/StayCard2";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import { client } from "@/utils/client";
import { TravelPackageCardType } from "@/data/types";
import { useSearchParams } from "next/navigation";

const query = `*[_type == "travelPackage"]{
  _id,
  id,
  packageName,
  images[] {
    asset-> {
      url
    },
    hotspot
  },
  duration,
  price,
  locations[] {
    locationId,
    locationName,
    map {
      lat,
      lng
    }
  }
}`;

const SectionGridHasMap: FC = () => {
  const [data, setData] = useState<TravelPackageCardType[]>([]);
  const [filteredData, setFilteredData] = useState<TravelPackageCardType[]>([]);
  const [priceRange, setPriceRange] = useState<number[] | null>(null);
  const searchParams = useSearchParams(); // Hook to access query parameters

  // Fetch and initialize data
  useEffect(() => {
    const fetchSanityData = async () => {
      const sanityData = await client.fetch(query);

      const mappedData = sanityData.map((item) => ({
        id: item.id,
        packageName: item.packageName,
        images: item.images,
        duration: item.duration,
        price: item.price,
        locations: item.locations,
      }));

      // Derive initial price range
      const prices = mappedData.map((item) => item.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setPriceRange([minPrice, maxPrice]);
      setData(mappedData);
      setFilteredData(mappedData);
    };

    fetchSanityData();
  }, []);

  // Filter by price range and query parameters
  useEffect(() => {
    if (!data.length || !priceRange) return;

    // Extract the `location` query parameter
    const locationName = searchParams.get("location")?.toLowerCase();

    const filtered = data.filter((item) => {
      const isWithinPriceRange =
        item.price >= priceRange[0] && item.price <= priceRange[1];

      const matchesLocation = locationName
        ? item.locations.some(
            (location) => location.locationName.toLowerCase() === locationName
          )
        : true; // Include all if no location filter

      return isWithinPriceRange && matchesLocation;
    });

    setFilteredData(filtered);
  }, [priceRange, searchParams, data]);

  return (
    <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
      <Heading2 className="!mb-8" />
      <div className="mb-8 lg:mb-11">
        {priceRange && (
          <TabFilters
            priceRange={priceRange}
            onApply={(newRange) => setPriceRange(newRange)}
            onClear={() => {
              // Reset to dynamically derived range
              const prices = data.map((item) => item.price);
              const minPrice = Math.min(...prices);
              const maxPrice = Math.max(...prices);
              setPriceRange([minPrice, maxPrice]);
            }}
          />
        )}
      </div>
      <div>
      {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.map((stay) => (
              <StayCard2 key={stay.id} data={stay} />
            ))}
          </div>
        ) : (
          <div className={`mb-12 lg:mb-16`}>
          <h2 className="text-2xl text-gray-600 font-semibold text-center">No packages found for the selected price range.</h2>
         </div>
        )}
      </div>
    </div>
  );
};

export default SectionGridHasMap;
