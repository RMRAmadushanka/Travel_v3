"use client"
import React, { FC, ReactNode, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";
import Heading from "@/shared/Heading";
import { client } from "@/utils/client";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);


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



//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  cardType = "card2",
}) => {

  const [data, setData] = useState<TravelPackageCardType[]>([]);


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
        saleOff: item.saleOff,
      }));

      setData(mappedData?.slice(0, 4))
 
    };

    fetchSanityData();
  }, []);

  console.log(data);
  

  const renderCard = (stay: StayDataType) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard;
    }

    return <CardName key={stay.id} data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <div className="flex justify-between">
      <Heading desc={subHeading}>{heading}</Heading>
  <span className="hidden sm:block flex-shrink-0 mt-10">
          <ButtonSecondary href="/travel-packages" className="!leading-none">
            <div className="flex items-center justify-center">
              <span>View all</span>
              <ArrowRightIcon className="w-5 h-5 ml-3" />
            </div>
          </ButtonSecondary>
        </span>
      </div>

      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {data.map((stay) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary href="/travel-packages" >Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
