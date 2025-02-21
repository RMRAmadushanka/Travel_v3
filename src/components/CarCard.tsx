import React, { FC } from "react";
import { DEMO_CAR_LISTINGS } from "@/data/listings";
import { CarDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import Image from "next/image";
import Link from "next/link";

export interface CarCardProps {
  className?: string;
  data?: CarDataType;
  size?: "default" | "small";
}

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0];

const CarCard: FC<CarCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
}) => {
  const {
    carId,
    vehicleName,
    seatingCapacity,
    gearType,
    perDayRent,
    reviewStart,
    reviewCount,
    cardImage
  } = data;



  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 ">
          <Image
            fill
            src={cardImage}
            alt="car"
            sizes="(max-width: 640px) 100vw, 350px"
          />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-5 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2
              className={`capitalize ${
                size === "default" ? "text-xl font-semibold" : "text-base font-medium"
              }`}
            >
              <span className="line-clamp-1">{vehicleName}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            <span>{seatingCapacity} seats</span>
            <span>-</span>
            <span>{gearType}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {perDayRent}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /day
              </span>
            )}
          </span>
          <StartRating reviewCount={reviewCount} point={reviewStart} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      data-nc-id="CarCard"
    >
      {/* Ensure that _id is a string */}
      <Link href={`/car-packages/listing-car-detail/${String(carId)}`} className="flex flex-col">
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default CarCard;
