import React, { FC } from "react";
import { DEMO_EXPERIENCES_LISTINGS } from "@/data/listings";
import { ExperiencesDataType, StayDataType } from "@/data/types";
import Heading2 from "@/shared/Heading2";
import CustomizedPackage from "./CustomizedPackage";

export interface SectionGridFilterCardProps {
  className?: string;
  data?: StayDataType[];
}

const DEMO_DATA: ExperiencesDataType[] = DEMO_EXPERIENCES_LISTINGS.filter(
  (_, i) => i < 8
);

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <Heading2
        heading="Build Your Dream Vacation"
      />


      <div className="flex mt-16 justify-center items-center">
      <CustomizedPackage/>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
