"use client";
import React, { FC, useEffect, useState } from "react";
import CommentListing from "@/components/CarCommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import StartRating from "@/components/StartRating";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import RentalCarDatesRangeInput from "../RentalCarDatesRangeInput";
import { Route } from "next";
import { client } from "@/utils/client";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
export interface ListingCarDetailPageProps { }
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "@/shared/Button";
const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({ }) => {
  const [carData, setCarData] = useState<any>(null); // Replace `any` with your car data type if available
  const [loading, setLoading] = useState(true);
  const { carId } = useParams();
  const [totalDays, setTotalDays] = useState<number>(0);
  const [setShouldResetDateRange] = useState(false);
  const [resetDates, setResetDates] = useState<() => void>(() => () => { });
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [setEmail] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);


  const [feedbacks, setFeedbacks] = useState(carData?.feedback || []);
  const [visibleFeedbacks, setVisibleFeedbacks] = useState(5);
  const [selectedRating, setSelectedRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);


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

  useEffect(() => {
    if (carData?.carId) {
      fetchUpdatedFeedbacks();
    }
  }, [carData?.carId]);


  const ShimmerLoader = () => {
    return (
      <div className="animate-pulse container ListingDetailPage__content">
        {/* Header Loader */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <div className="col-span-2 row-span-3 sm:row-span-2 bg-neutral-200 dark:bg-neutral-800 h-60 rounded-md"></div>
          <div className="bg-neutral-200 dark:bg-neutral-800 h-40 rounded-md"></div>
          <div className="bg-neutral-200 dark:bg-neutral-800 h-40 rounded-md"></div>
          <div className="hidden sm:block bg-neutral-200 dark:bg-neutral-800 h-40 rounded-md"></div>
          <div className="hidden sm:block bg-neutral-200 dark:bg-neutral-800 h-40 rounded-md"></div>
        </div>

        {/* Section Loader */}
        <div className="space-y-6">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 w-1/2 rounded-md"></div>
          <div className="space-y-3">
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-3/4 rounded-md"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-5/6 rounded-md"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 w-2/3 rounded-md"></div>
          </div>
        </div>

        {/* Sidebar Loader */}
        <div className="hidden lg:block space-y-4">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 w-1/3 rounded-md"></div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 w-full rounded-md"></div>
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 w-2/3 rounded-md"></div>
        </div>
      </div>
    );
  };
  if (loading) return <ShimmerLoader />
  if (!carData) return <div>Car not found</div>;


  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const sendEmail = (userDetails) => {


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
      (carData?.feedback?.length ?? 0) > 0
        ? carData!.feedback!.reduce((sum, item) => sum + item.rating, 0) / carData!.feedback!.length
        : 0;
    const reviewCount = carData?.feedback?.length ?? 0;

    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}


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
        
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
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
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
        <div className="text-neutral-6000 dark:text-neutral-300">
          <p>
            {carData?.description || "Unknown"}
          </p>
        </div>
      </div>
    );
  };

  const feedbackValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    comment: Yup.string().min(10, "Comment must be at least 10 characters").required("Comment is required"),
  });

  // Runs when packageData.id changes

  const fetchUpdatedFeedbacks = async () => {
    try {
      const response = await axios.get(`/api/car-feedback/${carData.carId}`);
      setFeedbacks(response.data);  // Update feedback list

    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setFeedbacks([]);

    }
  };

  // Handle adding new feedback
  const handleFeedback = async (values, { resetForm }) => {
    try {
      const res = await fetch("/api/car-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: carData?.carId,
          email: values.email,
          comment: values.comment,
          userName: values.email.split("@")[0],
          rating: selectedRating,
        }),
      });

      if (res.ok) {
        toast.success("feedback Added successfully!");
      } else {
        toast.error("Failed to submit feedback");
        throw new Error("Failed to submit feedback")
      }

      // Get the newly added feedback from the response and update the state
      const newFeedback = await res.json();

      // Append new feedback to the current list
      setFeedbacks((prevFeedbacks) => [newFeedback, ...prevFeedbacks]);
      setSelectedRating(5)

      resetForm();  // Reset the form after submission
    } catch (error) {
      console.error(error);
    }
  };


  const renderSection6 = () => {

    const totalFeedbacks = feedbacks?.length || 0;

    const handleViewMore = () => {
      setVisibleFeedbacks(visibleFeedbacks === 5 ? totalFeedbacks : 5);
    };


    const handleRatingChange = (newRating: number) => {
      setSelectedRating(newRating);
      console.log("User selected rating:", newRating);
      // You can use this value for API calls, state updates, etc.
    };

    return (
      <div className="listingSection__wrap">
        {/* HEADING */}

        <h2 className="text-2xl font-semibold">Reviews ({totalFeedbacks} reviews)</h2>
        <div className="w-50 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <Formik
          initialValues={{ email: "", comment: "" }}
          validationSchema={feedbackValidationSchema}
          onSubmit={handleFeedback}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5 gap-5">
              <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" defaultPoint={selectedRating} onChange={handleRatingChange} />

              <div className="relative">
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 px-4 py-3 rounded-3xl w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm pl-2 pt-2" />

                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Share your thoughts ..."
                  className="w-full px-4 py-3 rounded-3xl mt-4"
                />
                <ErrorMessage name="comment" component="div" className="text-red-500 text-sm pl-2 " />

                <ButtonPrimary type="submit" className="w-full mt-4" disabled={isSubmitting}>
                  Submit
                </ButtonPrimary>
              </div>
            </Form>
          )}
        </Formik>

        {/* Comments */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {feedbacks?.slice(0, visibleFeedbacks).map((item, key) => (
            <CommentListing key={item.carId || index} className="py-8" data={item} fetchUpdatedFeedbacks={fetchUpdatedFeedbacks} />
          ))}

          {totalFeedbacks > 5 && (
            <div className="pt-8">
              <ButtonSecondary onClick={handleViewMore}>
                {visibleFeedbacks === 5 ? `View more ${totalFeedbacks - 5} reviews` : "Show Less"}
              </ButtonSecondary>
            </div>
          )}
        </div>
      </div>
    );
  };

  //Policies
const renderSection8 = () => {
  return (
    <div className="listingSection__wrap py-6 px-4 bg-white dark:bg-neutral-800 rounded-lg ">
      {/* HEADING */}
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Things to know</h2>
      <div className="w-full border-b border-neutral-100 dark:border-neutral-700 mb-4" />

      {/* CONTENT */}
      <ul className="space-y-3 pl-5 list-disc">
        {carData?.policies.map((policy, index) => (
          <li key={index} className="text-lg text-gray-700 dark:text-gray-300">
            {policy}
          </li>
        ))}
      </ul>
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
      setIsLoading(true);
      const userDetails = {
        email: values.email,
        carName: carData?.vehicleName || "Default Car Name",
        pickupLocation: values.pickupLocation,
        totalDays: values.days,
        totalPrice: totalPrice,
        dates: { startDate, endDate },
        perDayPrice: carData.perDayRent,
      };




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

          toast.success(`Your car reservation ${carData?.carName} has been successfully completed.`);
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

        toast.error("There was an issue with your reservation. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading after request completes
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
            <div className="flex justify-between p-2">
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
            <div className="flex flex-col space-y-4 p-2">
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
            <Button className="bg-blue-600 text-gray-50" type="submit" loading={isLoading} disabled={isLoading}>Reserve</Button>

          </Form>
        )}
      </Formik>
    );
  };

  return (
    <div className={` nc-ListingCarDetailPage `}>
      {/* SINGLE HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
          {/* Main Image (First Image) */}
          <div
            className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
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
               
              />
            </div>
          ))}
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
        <div className=" lg:block flex-grow mt-14 lg:mt-0 min-h-screen">
          <div className="sticky top-28">{renderSidebarDetail()}</div>
        </div>
      </main>
    </div>
  );
};

export default ListingCarDetailPage;
