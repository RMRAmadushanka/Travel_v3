import React, { FC } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import SectionHeroArchivePage from "@/app/(server-components)/SectionHeroArchivePage";

export interface ListingStayPageProps {}

const ListingStayPage: FC<ListingStayPageProps> = () => {
  return (
  <div>

<div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
        <SectionHeroArchivePage currentPage="Stays" currentTab="Stays" />
      </div>
      <SectionGridFilterCard className="container pb-24 lg:pb-28" />
  </div>
)
};

export default ListingStayPage;
