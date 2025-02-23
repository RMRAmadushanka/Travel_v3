"use client";
import React, { Suspense, useEffect, useState } from "react";
import SectionHowItWork from "@/components/SectionHowItWork";
import HIW1img from "@/images/HIW2-1.png";
import HIW2img from "@/images/HIW2-2.png";
import HIW3img from "@/images/HIW2-3.png";
import HIW1imgDark from "@/images/HIW2-1-dark.png";
import HIW2imgDark from "@/images/HIW2-2-dark.png";
import HIW3imgDark from "@/images/HIW2-3-dark.png";
import SectionHero2 from "@/app/(server-components)/SectionHero2";
import { client } from "@/utils/client";
import CarCard from "@/components/CarCard";

function PageHome2() {
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "carRental"]{
            _id,
            carId,
            vehicleName,
            perDayRent,
            "galleryImgs": galleryImages[].asset->url,
            seatingCapacity,
            luggageCapacity,
            gearType,
            description,
            policies,
            "reviewStart": feedback[0].rating,
            "reviewCount": count(feedback),
            "cardImage": cardImage.asset->url  // Adding the cardImage field here
          }`
        );
        setCarData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching car rental data:", error);
      }
    };

    fetchData();
  }, []);

  return (

    <main className="nc-PageHome2 relative overflow-hidden">
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <SectionHero2 className="" />

        <SectionHowItWork
          data={[
            {
              id: 1,
              img: HIW1img,
              imgDark: HIW1imgDark,
              title: "Select Your Car",
              desc: "Browse through a range of cars available for your trip. Choose the one that fits your needs.",
            },
            {
              id: 2,
              img: HIW2img,
              imgDark: HIW2imgDark,
              title: "Enter Your Details",
              desc: "Provide your personal details, pickup location, dates, and car preferences to complete the reservation form.",
            },
            {
              id: 3,
              img: HIW3img,
              imgDark: HIW3imgDark,
              title: "Confirm & Reserve",
              desc: "Review your selection, confirm your details, and we'll contact you to finalize your reservation.",
            },
          ]}
        />

        <div>
          <h2 className="text-3xl font-semibold">Featured Cars to Rent for Your Trip</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {carData.map((car) => (
            <CarCard key={car._id} data={car} />
          ))}
        </div>
      </div>
    </main>

  );
}

export default PageHome2;
