"use client"
import React from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import CardCategory6 from "@/components/CardCategory6";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionVideos from "@/components/SectionVideos";
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Hill Country Escapes",
    taxonomy: "category",
    count: 12000,
    thumbnail:
      "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // A scenic photo of Sri Lankan hills
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Beachfront Villas",
    taxonomy: "category",
    count: 18000,
    thumbnail:
      "https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // A tropical Sri Lankan beach photo
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "Historical Heritage Stays",
    taxonomy: "category",
    count: 15000,
    thumbnail:
      "https://images.pexels.com/photos/356644/pexels-photo-356644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", // A photo of a Sri Lankan heritage site
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Rainforest Retreats",
    taxonomy: "category",
    count: 8000,
    thumbnail:
      "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // A lush rainforest in Sri Lanka
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "Luxury Colombo Hotels",
    taxonomy: "category",
    count: 10000,
    thumbnail:
      "https://images.pexels.com/photos/12584266/pexels-photo-12584266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // A luxury hotel in Colombo
  },
];


function PageHome() {
  return (
    <main className="nc-PageHome3 relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container px-1 sm:px-4 mb-24 ">
        <SectionHero3 className="" />
      </div>

      <div className="container relative space-y-24 mb-24 ">
        {/* SECTION 1 */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[0]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
            <CardCategory6 taxonomy={DEMO_CATS_2[3]} />
            <CardCategory6 taxonomy={DEMO_CATS_2[1]} />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <CardCategory6 taxonomy={DEMO_CATS_2[4]} />
          </div>
        </div>
        <SectionGridFeaturePlaces />
        <SectionVideos />
     <FloatingWhatsApp phoneNumber="+94766694545" accountName="Ceylon Travels Guid "/>
      </div>
    </main>
  );
}

export default PageHome;
