import React, { FC, ReactNode } from "react";
import imagePng from "@/images/hero-right4.png";
import HeroSearchForm, {
  SearchTab,
} from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import Image, { StaticImageData } from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  currentPage: "Stays" | "Experiences" | "Cars" | "Flights";
  currentTab: SearchTab;
  rightImage?: StaticImageData;
  onSearchClick?: () => void;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  rightImage = imagePng,
  onSearchClick,
}) => {
  return (
<div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
          Explore SriLanka
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
          Choose the perfect getaway with curated packages including top 
          destinations and affordable prices.
          </span>
          <ButtonPrimary sizeClass="px-5 py-4 sm:px-7" onClick={onSearchClick}>
          See Packages
          </ButtonPrimary>
        </div>
        <div className="flex-grow">
          <Image className="w-full" src={imagePng} alt="hero" priority />
        </div>
      </div>

      <div className="lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        <div className="lg:relative absolute bottom-0 left-0 w-full">
          <HeroSearchForm />
        </div>
      </div>


    </div>
  );
};

export default SectionHeroArchivePage;
