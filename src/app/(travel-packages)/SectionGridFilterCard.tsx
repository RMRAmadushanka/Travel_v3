"use client";
import React, { FC, useEffect, useState } from "react";
import { TravelPackageCardType } from "@/data/types";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import StayCard2 from "@/components/StayCard2";
import { client } from "@/utils/client";

export interface SectionGridFilterCardProps {
  className?: string;
}

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
  saleOff,
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

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
}) => {
  const [data, setData] = useState<TravelPackageCardType[]>([]);
  const [filteredData, setFilteredData] = useState<TravelPackageCardType[]>([]);
  const [priceRange, setPriceRange] = useState<number[] | null>(null); // Placeholder state
  const [minMax, setMinMax] = useState<number[] | null>(null);


  useEffect(() => {
  const fetchSanityData = async () => {
    const sanityData = await client.fetch(query);

    const mappedData = sanityData.map((item: any) => ({
      id: item.id,
      packageName: item.packageName,
      images: item.images,
      duration: item.duration,
      price: item.price,
      locations: item.locations,
      saleOff: item.saleOff,
    }));

    // Sort by the number of locations in ascending order (fewer locations first)
    const sortedData = mappedData.sort((a, b) => a.locations.length - b.locations.length); // ascending order

    // Derive minimum and maximum prices dynamically
    const prices = sortedData.map((item: any) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setMinMax([minPrice, maxPrice]);
    setPriceRange([minPrice, maxPrice]); // Dynamically set initial price range
    setData(sortedData);
    setFilteredData(sortedData); // Initially show all data
  };

  fetchSanityData();
}, []);


  useEffect(() => {
    if (priceRange) {
      const filtered = data.filter(
        (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
      );
      setFilteredData(filtered);

    }
  }, [priceRange, data]);

  const ShimmerLoader = () => (
    <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: data.length || 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-200 rounded-lg h-64 w-full"
        ></div>
      ))}
    </div>
  );

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 />
      <div className="mb-8 lg:mb-11">
        {priceRange && (
          <TabFilters
            priceRange={minMax}
            onApply={(newRange) => setPriceRange(newRange)}
            onClear={() => {
              // Reset to dynamically derived range
              const prices = data.map((item) => item.price);
              const minPrice = Math.min(...prices);
              const maxPrice = Math.max(...prices);
              setPriceRange([0, maxPrice]);
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
          <ShimmerLoader />
        )}
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
