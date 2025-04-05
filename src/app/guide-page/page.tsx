"use client"

import Image from "next/image";
import TravelPkgGuid from "@/images/TravelPkgGuid.png";
import CarBookingGuid from "@/images/CarBookingGuid.png";
import CustomPckgGuid from "@/images/CustomPckgGuid.png";




function PageHome() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">How to Use Our Site</h1>

      {/* Section: Booking a Travel Package */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">1. Booking a Travel Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ol className="list-decimal pl-6 space-y-4">
              <li>Browse available travel packages.</li>
              <li>Select the package you’re interested in.</li>
              <li>Review the itinerary, accommodation, and inclusions.</li>
              <li>Choose your travel dates and number of people.</li>
              <li>Add any optional services (e.g., airport transfers, extra tours).</li>
              <li>Enter your details and payment information.</li>
              <li>Confirm your booking and receive a confirmation email.</li>
            </ol>
          </div>
          <div className="relative h-80">
            <Image
              src={TravelPkgGuid} // Replace with your actual image path
              alt="Booking a Travel Package"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Section: Creating a Custom Travel Package */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">2. Creating a Custom Travel Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ol className="list-decimal pl-6 space-y-4">
              <li>Go to the "Custom Travel Package" section.</li>
              <li>Select your preferred destinations.</li>
              <li>Choose the type of accommodation, transportation, and activities you’d like.</li>
              <li>Customize the package based on your preferences (e.g., travel dates, number of people, special requirements).</li>
              <li>Add your contact and payment information.</li>
              <li>Review your custom package details.</li>
              <li>Confirm and book your custom package.</li>
            </ol>
          </div>
          <div className="relative h-80">
            <Image
              src={CarBookingGuid}
              alt="Creating a Custom Travel Package"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Section: Renting a Car */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">3. Renting a Car</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ol className="list-decimal pl-6 space-y-4">
              <li>Navigate to the "Car Rentals" section.</li>
              <li>Enter your pick-up and drop-off locations.</li>
              <li>Choose the type of car you need (e.g., economy, SUV, luxury).</li>
              <li>Select the rental duration and any additional services (e.g., GPS, child seat).</li>
              <li>Review the rental terms and price.</li>
              <li>Enter your details and payment information.</li>
              <li>Confirm your booking and receive a rental confirmation email.</li>
            </ol>
          </div>
          <div className="relative h-80">
            <Image
              src={CustomPckgGuid}
              alt="Renting a Car"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default PageHome;
