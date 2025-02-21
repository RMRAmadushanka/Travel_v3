import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Swal from "sweetalert2";
import ButtonPrimary from "@/shared/ButtonPrimary"; // Ensure ButtonPrimary is correctly imported
import SaleOffBadge from "@/components/SaleOffBadge"; // Ensure SaleOffBadge is correctly imported
import StayDatesRangeInput from "./StayDatesRangeInput"; // Ensure this is correctly imported
import GuestsInput from "./GuestsInput"; // Ensure this is correctly imported
import * as Yup from 'yup';


const sendEmail = (userDetails:any) => {
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
    .send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_CAR_RESERVATION_TEMPLATE_ID, templateParams, process.env.NEXT_PUBLIC_EMAILJS_USER_ID)
    .then((response) => {
      console.log("Email sent successfully", response);
    })
    .catch((err) => {
      console.error("Error sending email", err);
    });
};


const validationSchema = Yup.object({
  pickupLocation: Yup.string()
  .required("Pickup location is required")
  .min(3, "Pickup location must be at least 3 characters"),
startDate: Yup.date().required("Start date is required"),
endDate: Yup.date().required("End date is required"),
  guests: Yup.number().required("Total guests is required").min(1, "At least one guest is required"),
});


interface ReservationSidebarProps {
    packageData: {
      price: number;
      duration: number;
      saleOff?: string;
      packageName: string;
    };
    totalGuests: number;
    setTotalGuests: (value: number) => void;
    setGuestAdults: (value: number) => void;
    setGuestChildren: (value: number) => void;
    setGuestInfants: (value: number) => void;
    startDate?: Date | null;
    setStartDate?: (date: Date | null) => void;
    endDate?: Date | null;
    setEndDate?: (date: Date | null) => void;
    pickupLocation: string;
    setPickupLocation: (location: string) => void;
    shouldReset: boolean;
    shouldResetDateRange: boolean;
  }
  
  interface ReservationFormValues {
    pickupLocation: string;
    guests: number;
    startDate: Date | null;
    endDate: Date | null;
  }

const ReservationSidebar = ({
  packageData,
  totalGuests,
  setTotalGuests,
  setGuestAdults,
  setGuestChildren,
  setGuestInfants,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  pickupLocation,
  setPickupLocation,
  shouldReset,
  shouldResetDateRange,
}:ReservationSidebarProps) => {
  const pricePerNight = packageData?.price || 0;
  const duration = packageData?.duration || 0;
  const saleOffPercentage = packageData?.saleOff
    ? parseFloat(packageData.saleOff.replace("%", "").trim())
    : 0;

  const totalWithoutDiscount = pricePerNight * duration * totalGuests;
  const discountAmount = Math.abs((totalWithoutDiscount * saleOffPercentage) / 100);
  const totalWithDiscount = totalWithoutDiscount - discountAmount;

  const handleReserve = async (values, { resetForm }) => {
    const userDetails = {
      email: "user@example.com", // Replace dynamically from user input
      name: "John Doe", // Replace dynamically from user input
      pickupLocation,
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
      email: "user@gmail.com",
      name: "username",
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
      const sendEmailPromise = new Promise((resolve, reject) => {
        try {
          sendEmail(userDetails);
          resolve("Email sent successfully");
        } catch (error) {
          reject("Error sending email");
        }
      });

      const apiCallPromise = fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageDataToSave),
      }).then((response) => response.json());

      const [emailResult, apiResult] = await Promise.all([sendEmailPromise, apiCallPromise]);

      if (apiResult.success) {
        Swal.fire({
          icon: "success",
          title: "Reservation Successful",
          text: `Your reservation for the ${packageData?.packageName} package has been successfully completed.`,
        });

        resetForm();
        setTotalGuests(0);
        setGuestAdults(0);
        setGuestChildren(0);
        setGuestInfants(0);
        setStartDate(null);
        setEndDate(null);
        setPickupLocation("");
      } else {
        throw new Error("Error saving package or sending email");
      }

      console.log(emailResult);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Reservation Failed",
        text: "There was an issue with your reservation. Please try again.",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        pickupLocation: "",
        guests: totalGuests,
        startDate,
        endDate,
      }}
      validationSchema={validationSchema}
      onSubmit={handleReserve}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="listingSectionSidebar__wrap shadow-xl">
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

          <div className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl">
            <div className="flex flex-col mx-4 mt-3 mb-3">
              <label className="block font-semibold my-3">
                Enter Pickup Location
              </label>
              <Field
                type="text"
                name="pickupLocation"
                placeholder="Enter pickup location"
                className="input-class"
                onChange={(e) => {
                  const value = e.target.value;
                  setFieldValue("pickupLocation", value);
                  setPickupLocation(value);
                }}
              />
              {touched.pickupLocation && errors.pickupLocation && (
                <div className="text-red-500">{errors.pickupLocation}</div>
              )}
            </div>

            <StayDatesRangeInput
              days={packageData?.duration}
              reset={shouldResetDateRange}
              onDatesChange={(start, end) => {
                setFieldValue("startDate", start);
                setFieldValue("endDate", end);
                setStartDate(start);
                setEndDate(end);
              }}
            />

<GuestsInput
            reset={shouldReset} 
          onTotalGuestsChange={(value) => {
            setFieldValue('guests', value); // Update Formik's state
            setTotalGuests(value); // Update your local state
          }}
          onTotalGuestsValuesChange={handleGuestValues}
      />
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span>
                {packageData?.price} LKR x {packageData?.duration} night x{" "}
                {totalGuests} guest{totalGuests > 1 ? "s" : ""}
              </span>
              <span>{totalWithoutDiscount} LKR</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>{packageData?.saleOff}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{totalWithDiscount} LKR</span>
            </div>
          </div>

          <ButtonPrimary type="submit">Reserve</ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
};

export default ReservationSidebar;
