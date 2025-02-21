import React, { FC } from "react";
import rightImgPng from "@/images/our-features.png";
import Image, { StaticImageData } from "next/image";
import Badge from "@/shared/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: StaticImageData;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"} ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <Image src={rightImg} alt="Explore Sri Lanka's beautiful destinations" />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${type === "type1" ? "lg:pl-16" : "lg:pr-16"}`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          Explore Sri Lanka
        </span>
        <h2 className="font-semibold text-4xl mt-5">Discover Sri Lanka's Hidden Gems</h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Affordable" />
            <span className="block text-xl font-semibold">
              Budget-Friendly Travel in Sri Lanka
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Discover Sri Lanka's beauty with cost-effective travel packages that offer great value and unforgettable experiences.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Adventure" />
            <span className="block text-xl font-semibold">
              Explore Sri Lanka's Natural Wonders
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              From lush rainforests to pristine beaches, Sri Lanka offers diverse landscapes perfect for adventure seekers and nature lovers.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Secure" />
            <span className="block text-xl font-semibold">
              Safe and Convenient Travel in Sri Lanka
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Book your Sri Lanka tour with confidence, knowing that our services prioritize your safety and convenience every step of the way.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
