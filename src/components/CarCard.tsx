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
      <div className="relative w-full rounded-xl overflow-hidden">
        {/* Responsive aspect ratio container */}
        <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60">
          <Image
            fill
            src={cardImage}
            alt={`${vehicleName} car rental`}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 sm:p-5 space-y-3 sm:space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2
              className={`capitalize ${
                size === "default" 
                  ? "text-lg sm:text-xl font-semibold" 
                  : "text-sm sm:text-base font-medium"
              }`}
            >
              <span className="line-clamp-1">{vehicleName}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm space-x-2">
            <span>{seatingCapacity} seats</span>
            <span>-</span>
            <span>{gearType}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className={`font-semibold ${size === "default" ? "text-sm sm:text-base" : "text-sm"}`}>
            {perDayRent}
            {` `}
            {size === "default" && (
              <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /day
              </span>
            )}
          </span>

        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-xl sm:rounded-xl overflow-hidden bg-white dark:bg-neutral-900 transition-shadow duration-300 hover:shadow-lg ${className}`}
      data-nc-id="CarCard"
    >
      <Link href={`/car-packages/listing-car-detail/${String(carId)}`} className="flex flex-col h-full">
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default CarCard;