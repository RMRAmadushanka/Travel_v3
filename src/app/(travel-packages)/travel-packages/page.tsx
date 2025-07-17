"use client"
import React, { FC, useRef } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import SectionHeroArchivePage from "@/app/(server-components)/SectionHeroArchivePage";

export interface ListingStayPageProps { }

const ListingStayPage: FC<ListingStayPageProps> = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToPackages = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>

      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        <SectionHeroArchivePage currentPage="Stays" currentTab="Stays" onSearchClick={handleScrollToPackages}  />
      </div>
      <div ref={scrollRef}>
      <SectionGridFilterCard className="container pb-24 lg:pb-28" />
      </div>
    </div>
  )
};

export default ListingStayPage;
