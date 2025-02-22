"use client";

import React, { FC, Fragment, Suspense, useEffect, useState } from "react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Badge from "@/shared/Badge";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Input from "@/shared/Input";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import RentalCarDatesRangeInput from "../RentalCarDatesRangeInput";
import { Route } from "next";
import { client } from "@/utils/client";
import emailjs from '@emailjs/browser';
export interface ListingCarDetailPageProps { }
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({ }) => {
  const [carData, setCarData] = useState<any>(null); // Replace `any` with your car data type if available
  const [loading, setLoading] = useState(true);
  const { carId } = useParams();
  const [totalDays, setTotalDays] = useState<number>(0);
  const [shouldResetDateRange, setShouldResetDateRange] = useState(false);
  const [resetDates, setResetDates] = useState<() => void>(() => () => { });
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const thisPathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    if (carId) {
      const fetchCarData = async () => {
        try {

          const result = await client.fetch(
            `*[_type == "carRental" && carId == $carId][0] {
  carId,
  vehicleName,
  perDayRent,
    utilities[] {
    utilityName,
    "icon": icon{
      "asset": asset->url,
      "hotspot": hotspot
    }
  },
  seatingCapacity,
  luggageCapacity,
  gearType,
  description,
  policies,
  "galleryImages": galleryImages[]{
    "asset": asset->url,
    "hotspot": hotspot
  },
  "cardImage": cardImage{
    "asset": asset->url,
    "hotspot": hotspot
  },
  feedback
}

`,
            { carId }
          )
          setCarData(result);
        } catch (error) {
          console.error("Error fetching car data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCarData();
    }
  }, [carId]);

  if (loading) return <div>Loading...</div>;
  if (!carData) return <div>Car not found</div>;


  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const sendEmail = (userDetails) => {
    console.log(startDate);

    const templateParams = {
      car_name: carData?.vehicleName,
      user_email: userDetails.email,
      pickup_location: userDetails.pickupLocation,
      dates: `${startDate} to ${endDate}`,
      car_price: userDetails.perDayPrice,
      total_days: userDetails.totalDays,
      total_price: totalPrice,
    };

    emailjs
      .send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_CAR_RESERVATION_TEMPLATE_ID, templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_ID)
      .then((response) => {
        console.log("Email sent successfully");
      })
      .catch((err) => {
        console.error("Error sending email");
      });
  };
  const renderSection1 = () => {
    const reviewStart =
      carData?.feedback.length > 0
        ? carData?.feedback.reduce((sum, item) => sum + item.rating, 0) / carData?.feedback.length
        : 0;
    const reviewCount = carData?.feedback.length;

    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge color="pink" name="BMW car" />
        </div>

        {/* Vehicle Name */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {carData.vehicleName}
        </h2>

        {/* reviewStart": feedback[0].rating,
          "reviewCount": count(feedback) pass as prop to this component*/}
        <div className="flex items-center space-x-4">
          <StartRating point={reviewStart} reviewCount={reviewCount} />
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* Seating Capacity, Gear Type, Luggage Capacity (Number of Bags) */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-user-friends text-2xl"></i>
            <span className="">{carData?.seatingCapacity || "Unknown"} seats</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-dharmachakra text-2xl"></i>
            <span className=""> {carData?.gearType || "Unknown"}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
            <i className="las la-suitcase text-2xl"></i>
            <span className=""> {carData?.luggageCapacity || "Unknown"} bags</span>
          </div>
        </div>
      </div>
    );
  };

  //Vehicle Utilities
  const renderSectionTienIch = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">
            Vehicle parameters & utilities{" "}
          </h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10 text-sm text-neutral-700 dark:text-neutral-300 ">
          {/* TIEN ICH 1 */}
          {carData?.utilities?.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-10 flex-shrink-0">
                <Image src={item.icon?.asset} alt={item.utilityName || `Utility ${index}`} width={20} height={20} />
              </div>
              <span>{item.utilityName}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  //Car descriptions
  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Car descriptions</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <p>
            {carData?.description || "Unknown"}
          </p>
        </div>
      </div>
    );
  };



  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* reviewCount": count(feedback)*/}
        <h2 className="text-2xl font-semibold">Reviews ({carData?.feedback.length || 0})</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* map the Feedback here */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {carData?.feedback.map((item, key) => {
            return <CommentListing key={key} className="py-8" data={item} />;
          })}
          <div className="pt-8">
            <ButtonSecondary>View more {carData?.feedback.length || 0} reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  //Policies
  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}

        {carData?.policies.map((policy, index) => (
          <div key={index}>
            <div >
              <span className="text-lg">{policy}</span>
            </div>
          </div>
        ))}



      </div>
    );
  };




  const validationSchema = Yup.object({
    pickupLocation: Yup.string()
      .required("Pickup location is required")
      .min(3, "Minimum 3 characters required"),
    days: Yup.number()
      .required("Total days is required")
      .min(1, "Must be at least 1 day"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),

  });


  const renderSidebarDetail = () => {


    const handleReserve = async (values, { resetForm }) => {
      const userDetails = {
        email: values.email,
        carName: carData?.vehicleName || "Default Car Name",
        pickupLocation: values.pickupLocation,
        totalDays: values.days,
        totalPrice: totalPrice,
        dates: { startDate, endDate },
        perDayPrice: carData.perDayRent,
      };

      console.log(carData.perDayRent);



      try {
        // Create promises for both functions
        const sendEmailPromise = new Promise((resolve, reject) => {
          try {
            sendEmail(userDetails);
            resolve('Email sent successfully');
          } catch (error) {
            reject('Error sending email');
          }
        });

        const apiCallPromise = fetch('/api/car-reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        }).then((response) => response.json());

        // Use Promise.all to execute both promises concurrently
        const [emailResult, apiResult] = await Promise.all([sendEmailPromise, apiCallPromise]);

        if (apiResult.success) {
          Swal.fire({
            icon: 'success',
            title: 'Reservation Successful',
            text: `Your car reservation ${carData?.carName} has been successfully completed.`,
          });

          // Reset the form after a successful reservation
          resetForm();
          setShouldResetDateRange(true)
          setResetDates(() => () => { });
          setStartDate(null); // Reset startDate state
          setEndDate(null); // Reset endDate state

        } else {
          throw new Error('Error saving package or sending email');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Reservation Failed',
          text: 'There was an issue with your reservation. Please try again.',
        });
      }
    };





    const calculateTotalPrice = () => {
      return carData.perDayRent * totalDays;
    };

    return (
      <Formik
        initialValues={{
          startDate: null,
          endDate: null,
          days: 0,
          email: '',
          pickupLocation: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleReserve}
      >
        {({ setFieldValue, values }) => (
          <Form className="listingSectionSidebar__wrap shadow-xl">
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
            <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl space-y-4 p-4">
              <div className="flex flex-col space-y-2">
                <label className="block xl:text-lg font-semibold">Enter Pickup Location</label>
                <Field
                  type="text"
                  name="pickupLocation"
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-800 dark:text-neutral-200"
                />
                <ErrorMessage name="pickupLocation" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

              <label className="block xl:text-lg font-semibold">Enter your Email</label>

              <Field
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-800 dark:text-neutral-200"
                onChange={(e) => {
                  const value = e.target.value;
                  setFieldValue('email', value);  // Update Formik state
                  setEmail(value);  // Update your custom local state
                }}
              />
              <ErrorMessage name="pickupLocation" component="div" className="text-red-500 text-sm" />



              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
              <RentalCarDatesRangeInput reset={resetDates} onDaysChange={async (days, startDate, endDate) => {
                setFieldValue("startDate", startDate);
                setFieldValue("endDate", endDate);
                setFieldValue("days", days);
                await setTotalDays(days)
                await setStartDate(startDate)
                await setEndDate(endDate)
                await setTotalPrice(days * carData.perDayRent);
              }}
              />
              <ErrorMessage name="totalDays" component="div" className="text-red-500 text-sm" />
            </div>

            {/* SUM */}
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                <span>
                  {carData?.perDayRent} LKR / day x {values.days} days
                </span>
                <span>LKR {calculateTotalPrice()}</span>
              </div>
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>LKR {calculateTotalPrice()}</span>
              </div>
            </div>

            {/* SUBMIT */}
            <ButtonPrimary type="submit">Reserve</ButtonPrimary>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <Suspense>
    <div className={` nc-ListingCarDetailPage `}>
      {/* SINGLE HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
          {/* Main Image (First Image) */}
          <div
            className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              src={carData?.galleryImages[0]?.asset || ""}
              alt="photo 0"
              className="object-cover rounded-md sm:rounded-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-50 transition-opacity"></div>
          </div>

          {/* Second Image */}
          <div
            className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              className="object-cover rounded-md sm:rounded-xl"
              src={carData?.galleryImages[1]?.asset || ""}
              alt="photo 1"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-50 transition-opacity"></div>
          </div>

          {/* Remaining Images (Index >= 2) */}
          {carData?.galleryImages.filter((_, i) => i >= 2 && i < 4).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 2 ? "block" : ""}`}
            >
              <div className="aspect-w-4 aspect-h-3">
                <Image
                  fill
                  className="object-cover w-full h-full rounded-md sm:rounded-xl "
                  src={item?.asset || ""}
                  alt="photos"
                  sizes="400px"
                />
              </div>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-50 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          {/* Show All Photos Button */}
          <div
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="h-5 w-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </div>
        </div>
      </header>


      {/* MAIn */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          {renderSectionTienIch()}
          {renderSection2()}
          {renderSection6()}
          {renderSection8()}
        </div>
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0 min-h-screen">
          <div className="sticky top-28">{renderSidebarDetail()}</div>
        </div>
      </main>
    </div>
    </Suspense>
  );
};

export default ListingCarDetailPage;
