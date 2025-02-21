import { useState } from "react";
import RentalCarDatesRangeInput from "./RentalCarDatesRangeInput";
import ButtonPrimary from "@/shared/ButtonPrimary";

const ListingCarDetailPage = () => {
    const [totalDays, setTotalDays] = useState<number>(0);
  
    const handleDaysChange = async (days: number) => {
      setTotalDays(days); // `setTotalDays` does not need to be awaited as it is synchronous
    };
  
    const calculateTotalPrice = (perDayRent: number) => {
      return perDayRent * totalDays;
    };
  
    const renderSidebarDetail = () => {
      const carData = { perDayRent: 1000 }; // Example car data
  
      return (
        <div className="listingSectionSidebar__wrap shadow-xl">
          {/* PRICE */}
          <div className="flex justify-between">
            <span className="text-3xl font-semibold">
              LKR {carData?.perDayRent}
              <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                /day
              </span>
            </span>
          </div>
  
          {/* FORM */}
          <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl space-y-4 p-4">
            {/* Pickup Location Input */}
            <div className="flex flex-col space-y-2">
              <label
                className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
              >
                Enter Pickup Location
              </label>
              <input
                type="text"
                placeholder="Enter pickup location"
                className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-800 dark:text-neutral-200"
              />
            </div>
            <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
  
            <RentalCarDatesRangeInput onDaysChange={handleDaysChange} />
          </form>
  
          {/* SUM */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
              <span>
                {carData?.perDayRent} x {totalDays} nights
              </span>
              <span>{calculateTotalPrice(carData.perDayRent)}</span>
            </div>
            <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
              <span>Service charge</span>
              <span>$0</span>
            </div>
            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{calculateTotalPrice(carData.perDayRent)}</span>
            </div>
          </div>
  
          {/* SUBMIT */}
          <ButtonPrimary href={"/checkout"}>Reserve</ButtonPrimary>
        </div>
      );
    };
  
    return <>{renderSidebarDetail()}</>;
  };
  
  export default ListingCarDetailPage;
  