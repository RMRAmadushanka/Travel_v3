"use client"
import React, { FC, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select2 from "react-select";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ContactUs: FC = () => {
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [location, setLocation] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<{ location: string; date: Date | null }[]>([]);
  const [tagsError, setTagsError] = useState<string>("");

  const handleAddTag = (setFieldValue: any, currentDays: any[]) => {
    if (!location || !date) {
      setTagsError("Location and Date are required");
      return;
    }

    const newTag = { location, date, note };
    const updatedDays = [...currentDays, newTag];
    
    // Update Formik's `days` array with the new location and date
    setFieldValue("days", updatedDays);

    setTagsError(""); // Clear error if values are valid
    setTags(updatedDays);
    setLocation(""); // Reset location after adding
    setDate(null);
    setNote("") // Reset date after adding
  };

  const handleDeleteTag = (index: number, setFieldValue: any, currentDays: any[]) => {
    const updatedTags = currentDays.filter((_, tagIndex) => tagIndex !== index);
    setTags(updatedTags);
    
    // Update Formik's `days` array to reflect the deleted tag
    setFieldValue("days", updatedTags);
  };

  const renderNoInclude = ({
  location,
  date,
  note,
  index,
  setFieldValue,
  currentDays,
}: {
  location: string;
  note: string;
  date: Date | null;
  index: number;
  setFieldValue: any;
  currentDays: any[];
}) => {
  const formattedDate = date ? date.toLocaleDateString() : "No date selected";
  const displayLocation = location || "No location selected";
  
  return (
    <div className="py-3">
      {/* Mobile Layout (stacked vertically) */}
      <div className="block md:hidden">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 pr-4">
            <div className="text-sm text-gray-500 mb-1">Location:</div>
            <div className="text-neutral-600 dark:text-neutral-400 font-medium">
              {displayLocation}
            </div>
          </div>
          <i
            className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer flex-shrink-0"
            onClick={() => handleDeleteTag(index, setFieldValue, currentDays)}
          ></i>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <div>
            <div className="text-sm text-gray-500 mb-1">Date:</div>
            <div className={`text-sm ${!date ? "text-red-500" : "text-neutral-600 dark:text-neutral-400"}`}>
              {formattedDate}
            </div>
          </div>
          
          {note && (
            <div>
              <div className="text-sm text-gray-500 mb-1">Note:</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                {note}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout (horizontal) */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex-1 min-w-0 pr-4">
          <span className="text-neutral-600 dark:text-neutral-400 font-medium truncate block">
            {displayLocation}
          </span>
        </div>
        
        <div className="flex-shrink-0 w-32 text-center px-2">
          <span className={`text-sm ${!date ? "text-red-500" : "text-neutral-600 dark:text-neutral-400"}`}>
            {formattedDate}
          </span>
        </div>
        
        {note && (
          <div className="flex-1 min-w-0 px-2 text-center">
            <span className="text-sm text-neutral-600 dark:text-neutral-400 truncate block">
              {note}
            </span>
          </div>
        )}
        
        <div className="flex-shrink-0 ml-4">
          <i
            className="text-2xl text-red-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
            onClick={() => handleDeleteTag(index, setFieldValue, currentDays)}
          ></i>
        </div>
      </div>
    </div>
  );
};

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .min(10, "Mobile number must be at least 10 digits")
      .required("Mobile number is required"),
    arrivalDate: Yup.date()
      .min(new Date(), "Arrival date must be in the future")
      .required("Arrival date is required"),
    pickupPlace: Yup.string()
      .min(2, "Pickup place must be at least 2 characters")
      .required("Pickup place is required"),
    country: Yup.object()
      .shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
      .required("Country is required"),
    groupSize: Yup.number()
      .min(1, "Group size must be at least 1")
      .max(50, "Group size cannot exceed 50")
      .required("Group size is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message cannot exceed 1000 characters")
      .optional(),
    days: Yup.array()
      .of(
        Yup.object().shape({
          date: Yup.date().required("Date is required"),
          location: Yup.string()
            .min(2, "Location must be at least 2 characters")
            .required("Location is required"),
          note: Yup.string()
            .notRequired()
        })
      )
      .min(1, "At least one day is required")
      .max(10, "You can only add up to 10 days"),
  });

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    arrivalDate: null as Date | null,
    pickupPlace: "",
    country: null,
    groupSize: 1,
    message: "",
    days: [] as { date: Date | null; location: string; note: string }[],
  };

  // Common input styling for consistent appearance
  const inputClassName = "border border-neutral-300 p-3 rounded-md w-full bg-white dark:bg-neutral-900 dark:border-neutral-700 h-12";

  // Custom styles for react-select to match other inputs
  const selectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: '48px',
      minHeight: '48px',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#fff',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #d1d5db'
      },
      '&:focus': {
        border: '1px solid #d1d5db',
        boxShadow: 'none'
      }
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: '46px',
      padding: '0 12px'
    }),
    input: (provided: any) => ({
      ...provided,
      margin: '0',
      padding: '0'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '46px'
    })
  };

  return (
    <div className="min-h-screen bg-white rounded-xl">
      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center bg-no-repeat rounded-xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://wallpapers.com/images/featured/best-travel-background-04ml2h9wywaoo6ei.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
        <div className="relative z-10 flex flex-col justify-center h-full px-8 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Build Your Perfect Adventure
          </h1>
          <p className="text-xl text-white opacity-90">
            Create a personalized travel experience tailored just for you
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (values.days.length === 0) {
              setTagsError("You must select at least one travel day.");
              setSubmitting(false);
              return;
            }
            
            console.log(values);
            
            setTagsError("");
            fetch("/api/packages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to send message");
                }
                return response.json();
              })
              .then((data) => {
                toast.success("Your customized package request has been successfully submitted. Our team will contact you shortly!");
                resetForm();
                setTags([]);
                setLocation("");
                setDate(null);
                setTagsError("");
              })
              .catch((error) => {
                toast.error("Something went wrong. Please try again later.");
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ values, setFieldValue, errors, touched, isSubmitting }) => (
            <Form className="space-y-8">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Name Field */}
                <div>
                  <Label>Name <span className="text-red-500">*</span></Label>
                  <Field
                    name="name"
                    placeholder="Your full name"
                    className={inputClassName}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <Label>E-mail <span className="text-red-500">*</span></Label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Your actual e-mail"
                    className={inputClassName}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <Label>Phone <span className="text-red-500">*</span></Label>
                  <PhoneInput
                    country={'lk'}
                    value={values.mobile}
                    onChange={(value) => setFieldValue('mobile', value)}
                    containerClass="phone-input-container rounded-md text-black w-full"
                    inputClass="phone-input"
                    inputStyle={{
                      width: "100%",
                      height: '48px',
                      padding: '12px',
                      paddingLeft: '60px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      color: '#000',
                      backgroundColor: '#fff',
                      textAlign: 'left',
                    }}
                    containerStyle={{
                      width: '100%',
                    }}
                    placeholder="Your phone Number"
                    inputProps={{
                      placeholder: 'Your phone Number',
                    }}
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Second Row - All fields with consistent sizing */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Pickup Place Field */}
                <div>
                  <Label>Pickup Place <span className="text-red-500">*</span></Label>
                  <Field
                    name="pickupPlace"
                    placeholder="Your Pickup Place"
                    className={inputClassName}
                  />
                  <ErrorMessage
                    name="pickupPlace"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Country Field */}
                <div>
                  <Label>Country <span className="text-red-500">*</span></Label>
                  <Select2
                    options={countryOptions}
                    value={values.country}
                    onChange={(value) => setFieldValue("country", value)}
                    className="text-black"
                    placeholder="Select your country"
                    styles={selectStyles}
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Group Size Field */}
                <div>
                  <Label>Group Size <span className="text-red-500">*</span></Label>
                  <Field
                    name="groupSize"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="Number of people"
                    className={inputClassName}
                  />
                  <ErrorMessage
                    name="groupSize"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Arrival Date Field */}
                <div>
                  <Label>Arrival Date <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <DatePicker
                      selected={values.arrivalDate}
                      onChange={(date) => setFieldValue('arrivalDate', date)}
                      className={inputClassName}
                      placeholderText="Select arrival date"
                      dateFormat="MMM dd, yyyy"
                      minDate={new Date()}
                      wrapperClassName="w-full"
                    />
                  </div>
                  <ErrorMessage
                    name="arrivalDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <Label>Message</Label>
                <Field
                  as="textarea"
                  name="message"
                  rows={6}
                  placeholder="Add more details to your inquiry"
                  className="border border-neutral-300 p-3 rounded-md w-full bg-white dark:bg-neutral-900 dark:border-neutral-700 resize-none"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Days Selection */}
<div className="space-y-6">
  <div>
    <Label>Travel Days <span className="text-red-500">*</span></Label>
    <p className="text-sm text-gray-600 mb-4">Add the locations and dates for your travel itinerary</p>
  </div>
  
  {/* Mobile Layout (stacked vertically) */}
  <div className="block lg:hidden space-y-4">
    {/* Location Input */}
    <div className="flex items-center bg-white rounded-full px-4 py-3 border border-neutral-300 shadow-sm">
      <i className="text-blue-500 las la-map-marker-alt text-lg flex-shrink-0"></i>
      <input
        className="ml-3 w-full border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>

    {/* Date and Note Row for Mobile */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Date Picker */}
      <div className="flex items-center bg-white rounded-full px-4 py-3 border border-neutral-300 shadow-sm">
        <i className="text-blue-500 las la-calendar-alt text-lg flex-shrink-0"></i>
        <DatePicker
          selected={date}
          onChange={setDate}
          className="ml-3 w-full border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
          placeholderText="Select Date"
          dateFormat="MMM dd, yyyy"
          minDate={new Date()}
        />
      </div>

      {/* Note Input */}
      <div className="flex items-center bg-white rounded-full px-4 py-3 border border-neutral-300 shadow-sm">
        <i className="text-blue-500 las la-sticky-note text-lg flex-shrink-0"></i>
        <input
          className="ml-3 w-full border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
          type="text"
          placeholder="Add Note (Optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </div>

    {/* Add Button for Mobile */}
    <button
      className="w-full bg-blue-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm"
      onClick={(e) => {
        e.preventDefault();
        handleAddTag(setFieldValue, values.days);
      }}
    >
      <i className="las la-plus mr-2"></i>
      Add Day
    </button>
  </div>
  
  {/* Desktop Layout (horizontal) */}
  <div className="hidden lg:block">
    <div className="border border-neutral-300 rounded-2xl p-4 bg-gray-50/50">
      <div className="flex flex-wrap xl:flex-nowrap items-center gap-4">
        {/* Location Input */}
        <div className="flex items-center bg-white rounded-full px-4 py-3 flex-1 min-w-0 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
          <i className="text-blue-500 las la-map-marker-alt text-lg flex-shrink-0"></i>
          <input
            className="ml-3 w-full border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Date Picker */}
        <div className="flex items-center bg-white rounded-full px-4 py-3 w-full xl:w-48 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
          <i className="text-blue-500 las la-calendar-alt text-lg flex-shrink-0"></i>
          <DatePicker
            selected={date}
            onChange={setDate}
            className="ml-3 w-full border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
            placeholderText="Select Date"
            dateFormat="MMM dd, yyyy"
            minDate={new Date()}
          />
        </div>

        {/* Note Input */}
        <div className="flex items-center bg-white rounded-full px-4 py-3 flex-1 min-w-0 xl:max-w-xs border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
          <i className="text-blue-500 las la-sticky-note text-lg flex-shrink-0"></i>
          <input
            className="ml-3 w-full border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500"
            type="text"
            placeholder="Add Note (Optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Add Button */}
        <button
          className="bg-blue-600 text-white rounded-full px-8 py-3 font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md flex-shrink-0 whitespace-nowrap"
          onClick={(e) => {
            e.preventDefault();
            handleAddTag(setFieldValue, values.days);
          }}
        >
          <i className="las la-plus mr-2"></i>
          Add Day
        </button>
      </div>
    </div>
  </div>
  
  {/* Error Messages */}
  <div className="space-y-2">
    {tagsError && (
      <div className="flex items-center text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
        <i className="las la-exclamation-circle mr-2 flex-shrink-0"></i>
        {tagsError}
      </div>
    )}

    {errors.days && typeof errors.days === 'string' && (
      <div className="flex items-center text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
        <i className="las la-exclamation-triangle mr-2 flex-shrink-0"></i>
        {errors.days}
      </div>
    )}
  </div>
</div>

              {/* Render Added Days */}
              {values.days.length > 0 && (
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
                    <div className="py-3">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Your Travel Itinerary ({values.days.length} day{values.days.length !== 1 ? 's' : ''})
                      </h3>
                    </div>
                    {values.days.map((day, index) => (
                      <div key={index}>
                        {renderNoInclude({ 
                          location: day.location, 
                          date: day.date,
                          note: day.note,
                          index, 
                          setFieldValue,
                          currentDays: values.days 
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Submit Button */}
              <div>

                
                        <button
          className="bg-blue-600 text-white rounded-full px-8 py-3 font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-sm hover:shadow-md flex-shrink-0 whitespace-nowrap"
          type="submit"
          disabled={isSubmitting}
        >
         
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUs;