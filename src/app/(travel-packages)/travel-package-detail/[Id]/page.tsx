"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CommentListing from "@/components/CommentListing";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Input from "@/shared/Input";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PHOTOS } from "./constant";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { Route } from "next";
import "react-phone-input-2/lib/style.css";
import GuestsInput from "./GuestsInput";
import { client } from "@/utils/client";
import SaleOffBadge from "@/components/SaleOffBadge";
import emailjs from '@emailjs/browser';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import MobileFooterSticky from "@/components/MobileFooterSticky";
export interface ListingStayDetailPageProps { }

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({ }) => {


  //
  const thisPathname = usePathname();
  const router = useRouter();
  const { Id } = useParams();


  const [packageData, setPackageData] = useState(null);
  const [totalGuests, setTotalGuests] = useState(0);
  const [guestAdults, setGuestAdults] = useState(0);
  const [guestChildren, setGuestChildren] = useState(0);
  const [guestInfants, setGuestInfants] = useState(0);
  const [pickupLocation, setPickupLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [resetGuests, setResetGuests] = useState<() => void>(() => () => { });
  const [shouldResetDateRange, setShouldResetDateRange] = useState(false);



  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "travelPackage" && id == $id][0]{
            packageName,
            description,
            duration,
            price,
            locations[]{
              locationId,
              locationName,
              map { lat, lng }
            },
            feedback[]{
              rating,
              userName,
              comment
            },
            registerDate,
            saleOff,
            guestCount,
            vehicles[]{
              vehicleId,
              vehicleName,
              vehicleType
            },
            images[]{ asset->{url} }
          }`,
          { id: Id } // Replace with actual package ID
        );
        setPackageData(data);
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchPackage();
  }, []);


  const sendEmail = (userDetails) => {
    const templateParams = {
      user_name: userDetails.name,
      user_email: userDetails.email,
      package_name: userDetails.packageName,
      pickup_location: userDetails.pickupLocation,
      total_price: userDetails.totalWithoutDiscount,
      dates: `${startDate} to ${endDate}`,
      discount: userDetails.discount,
      total_after_discount: userDetails.totalWithDiscount,
      admin_dashboard_url: "https://admin-dashboard.example.com", // Replace with your actual admin dashboard URL
      subject: `New reservation from ${userDetails.name}`,
      admin_email: "travelnextjs@gmail.com",
      total_guests: userDetails.totalGuests,
      guests: `Adults: ${userDetails.guests.guestAdults}\nChildren: ${userDetails.guests.guestChildren}\nInfants: ${userDetails.guests.guestInfants}`,
    };

    emailjs
      .send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_PACKAGE_RESERVATION_TEMPLATE_ID, templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_ID)
      .then((response) => {
        console.log("Email sent successfully");
      })
      .catch((err) => {
        console.error("Error sending email");
      });
  };



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



  if (!packageData) return <ShimmerLoader />

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Package Description</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          {/* Description */}
          <span>
            {packageData?.description}
          </span>

        </div>
      </div>
    );
  };




  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Package Locations with dates</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            {packageData?.locations.map((location, index) => (
              <div
                key={index}
                className={`p-4 flex justify-between items-center space-x-4 rounded-lg ${index % 2 === 0 ? "bg-neutral-100 dark:bg-neutral-800" : ""
                  }`}
              >
                <span>{`Day ${index + 1}`}</span>
                <span>{location.locationName}</span>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  };

  //Feedback section
  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
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

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {packageData?.feedback.map((item, key) => {
            return <CommentListing key={key} className="py-8" data={item} />;
          })}
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };



  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            Refund 50% of the booking value when customers cancel the room
            within 48 hours after successful booking and 14 days before the
            check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50%
            refund of the total amount paid (minus the service fee).
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      </div>
    );
  };

  const validationSchema = Yup.object({
    pickupLocation: Yup.string()
      .required("Pickup location is required")
      .min(3, "Pickup location must be at least 3 characters"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
    phoneNumber: Yup.string().required("Mobile number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    name: Yup.string()
      .required("Your name is required")
      .min(3, "Name must be at least 3 characters"),
    guests: Yup.number().required("Total guests is required").min(1, "At least one guest is required"),
  });



  const renderSidebar = () => {

    const pricePerNight = packageData?.price || 0;
    const duration = packageData?.duration || 0;
    const saleOffPercentage = packageData?.saleOff
      ? parseFloat(packageData.saleOff.replace("%", "").trim())
      : 0;

    const totalWithoutDiscount = pricePerNight * duration * totalGuests;
    const discountAmount = Math.abs((totalWithoutDiscount * saleOffPercentage) / 100);
    const totalWithDiscount = totalWithoutDiscount - discountAmount;

    const initialPricePerNight = parseFloat(String(packageData?.price).replace("LKR", "").trim()) || 0;
    const initialDuration = parseInt(String(packageData?.duration).replace("night", "").trim()) || 0;

    const initialTotal = initialPricePerNight * initialDuration;

    const handleReserve = async (values, { resetForm }) => {
      const userDetails = {
        email: email,
        name: name,
        pickupLocation: pickupLocation,
        totalGuests,
        totalWithDiscount,
        dates: { startDate, endDate },
        packageName: packageData?.packageName || "Default Package Name",
        totalWithoutDiscount,
        discount: packageData?.saleOff || "0%",
        guests: { guestAdults, guestChildren, guestInfants },
      };

      const packageDataToSave = {
        packageName: packageData?.packageName,
        email: email,
        name: name,
        discount: packageData?.saleOff,
        price: pricePerNight,
        duration: duration,
        totalGuests,
        totalWithDiscount,
        totalWithoutDiscount,
        saleOff: packageData?.saleOff,
        dates: { startDate, endDate },
        guests: { guestAdults, guestChildren, guestInfants },
        pickupLocation,
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

        const apiCallPromise = fetch('/api/reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(packageDataToSave),
        }).then((response) => response.json());

        // Use Promise.all to execute both promises concurrently
        const [emailResult, apiResult] = await Promise.all([sendEmailPromise, apiCallPromise]);

        if (apiResult.success) {
          Swal.fire({
            icon: 'success',
            title: 'Reservation Successful',
            text: `Your reservation for the ${packageData?.packageName} package has been successfully completed.`,
          });

          // Reset the form after a successful reservation
          resetForm();
          setResetGuests(() => () => { });
          setShouldResetDateRange(true)
          // Reset the custom components
          setTotalGuests(0); // Reset guests total state
          setGuestAdults(0); // Reset guest adults state
          setGuestChildren(0); // Reset guest children state
          setGuestInfants(0); // Reset guest infants state

          setStartDate(null); // Reset startDate state
          setEndDate(null); // Reset endDate state
          setPickupLocation(''); // Reset pickupLocation state
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



    const handleGuestValues = (adults: number, children: number, infants: number) => {
      setGuestAdults(adults);
      setGuestChildren(children);
      setGuestInfants(infants);
    }
    return (
      <Formik
        initialValues={{
          pickupLocation: '',
          guests: totalGuests,
          startDate: startDate,
          endDate: endDate,
          email: '',
          phoneNumber: '',
          name: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleReserve}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="listingSectionSidebar__wrap shadow-xl">
            {/* PRICE */}
            <div className="flex justify-between">
              <span className="text-3xl font-semibold">
                {packageData?.price} LKR
                <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
                  /night
                </span>
              </span>
              {packageData?.saleOff && packageData?.saleOff.trim() !== "" && (
                <SaleOffBadge desc={packageData?.saleOff} />
              )}
            </div>

            {/* FORM */}
            <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl">
              <div className="flex flex-col mx-4 mt-3 mb-3">
                <label className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate my-3">
                  Enter Pickup Location
                </label>
                <Field
                  type="text"
                  name="pickupLocation"
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-800 dark:text-neutral-200"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue('pickupLocation', value);  // Update Formik state
                    setPickupLocation(value);  // Update your custom local state
                  }}
                />
                {touched.pickupLocation && errors.pickupLocation && (
                  <div className="text-red-500 text-center">{errors.pickupLocation}</div>
                )}
              </div>
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

              <StayDatesRangeInput
                className="flex-1 z-[11]"
                days={packageData?.duration}
                reset={shouldResetDateRange}
                onDatesChange={async (start, end) => {
                  setFieldValue("startDate", start);
                  setFieldValue("endDate", end);
                  await setStartDate(start)
                  await setEndDate(end)
                }}
              />
              <div className="flex flex-row justify-center items-center text-center">
                {touched.startDate && errors.startDate && touched.endDate && errors.endDate && (
                  <div className="text-red-500">{errors.startDate} - {errors.endDate}</div>
                )}
              </div>
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
              <GuestsInput
                reset={resetGuests}
                onTotalGuestsChange={(value) => {
                  setFieldValue('guests', value); // Update Formik's state
                  setTotalGuests(value); // Update your local state
                }}
                onTotalGuestsValuesChange={handleGuestValues}
              />
              {touched.guests && errors.guests && (
                <div className="text-red-500 text-center">{errors.guests}</div>
              )}
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>


              <div className="flex flex-col mx-4 mt-3 mb-3">
                <label className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate my-3">
                  Enter your name here
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name here"
                  className="w-full px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-neutral-800 dark:text-neutral-200"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFieldValue('name', value);  // Update Formik state
                    setName(value);  // Update your custom local state
                  }}
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 text-center">{errors.name}</div>
                )}
              </div>
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

              <div className="flex flex-col mx-4 mt-3 mb-3">
                <label className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate my-3">
                  Enter your Email
                </label>
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
                {touched.email && errors.email && (
                  <div className="text-red-500 text-center">{errors.email}</div>
                )}
              </div>
              <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>

              <div className="flex flex-col mx-4 mt-3 mb-3">
                <label className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate my-3">
                  Enter Your phone number
                </label>
                <PhoneInput
                  
                  value={phoneNumber}
                  onChange={(value) => {
                    setFieldValue('phoneNumber', value);
                    setPhoneNumber(value);
                  }}
                  containerClass="phone-input-container  rounded-md text-black"
                  inputClass="phone-input"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div className="text-red-500 text-center">{errors.phoneNumber}</div>
                )}
              </div>
            </div>

            {/* SUM */}
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>
                  {packageData?.price} LKR x {packageData?.duration} night x {totalGuests} guest
                  {totalGuests > 1 ? "s" : ""}
                </span>
                <span>
                  {totalWithoutDiscount > 0
                    ? `${totalWithoutDiscount} LKR`
                    : `${initialTotal} LKR`}
                </span>
              </div>

              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>Discount</span>
                <span>{packageData?.saleOff}</span>
              </div>
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{totalWithDiscount} LKR</span>
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
    <div className="container ListingDetailPage__content">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
            onClick={handleOpenModalImageGallery}
          >
            <Image
              fill
              className="object-cover rounded-md sm:rounded-xl"
              src={PHOTOS[0]}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-50 transition-opacity"></div>
          </div>
          {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""
                }`}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <Image
                  fill
                  className="object-cover rounded-md sm:rounded-xl "
                  src={item || ""}
                  alt=""
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

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>

        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row  ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection2()}
          {renderSection4()}
          {renderSection8()}
          {renderSection6()}

        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0 min-h-screen">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
        <MobileFooterSticky />
      </main>
    </div>
  );
};

export default ListingStayDetailPage;
