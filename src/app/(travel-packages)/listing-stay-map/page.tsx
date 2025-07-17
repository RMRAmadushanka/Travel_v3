import React, { FC } from "react";
import SectionGridHasMap from "../SectionGridHasMap";
import { Metadata } from "next";
type Props = {
  searchParams: {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
  };
};
export interface ListingStayMapPageProps {}
export function generateMetadata({ searchParams }: Props): Metadata {
  const { location, minPrice, maxPrice } = searchParams;
  let title = "Search Packages | Ceylon Travels Guide";
  let description =
    "Discover and book the best Sri Lanka travel packages—hotels, vehicles & tours—all in one place.";

  if (location) {
    title = `Travel Packages in ${location} | Ceylon Travels Guide`;
    description = `Explore curated Sri Lanka travel packages in ${location}`;
    if (minPrice && maxPrice) {
      description += ` from $${minPrice} to $${maxPrice}`;
    }
    description +=
      ". Book hotels and vehicles for your perfect, hassle‑free Sri Lanka adventure.";
  }

  return {
    title,
    description,
  };
}
const ListingStayMapPage: FC<ListingStayMapPageProps> = ({}) => {
  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap />
    </div>
  );
};

export default ListingStayMapPage;
