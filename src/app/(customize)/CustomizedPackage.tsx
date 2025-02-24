"use client"
import React, { FC, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MultiSelect } from "react-multi-select-component";
import Select2 from "react-select";
import countryList from "react-select-country-list";
import { client } from "@/utils/client";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from 'react-icons/fa'; // Calendar icon from react-icons

const CustomizedPackage: FC = () => {
  const countryOptions = useMemo(() => countryList().getData(), []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    mobile: Yup.string().required("Mobile number is required"),
    arrivalDate: Yup.date().required("Arrival date is required"),
    pickupPlace: Yup.string().required("Pickup place is required"),
    country: Yup.object().required("Country is required"),
    groupSize: Yup.number().min(1, "Group size must be at least 1").required("Group size is required"),
    days: Yup.array()
      .of(
        Yup.object().shape({
          date: Yup.date().required("Date is required"),
          location: Yup.string().required("Location is required"),
        })
      )
      .min(1, "At least one day is required")
      .max(10, "You can only add up to 10 days"),
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations from Sanity
    const fetchLocations = async () => {
      const query = `
        *[_type == "travelPackage"] {
          locations[] {
            locationId,
            locationName
          }
        }
      `;
      const result = await client.fetch(query);
      // Flatten the locations from all packages
      const allLocations = result.flatMap((pkg: any) => pkg.locations || []);
      setLocations(allLocations);
    };

    fetchLocations();
  }, []);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    arrivalDate: "",
    pickupPlace: "",
    country: null,
    groupSize: 1,
    days: [{ date: "", location: "" }],
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            fetch("/api/packages", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Failed to save package");
                }
                return response.json();
              })
              .then((data) => {
                Swal.fire({
                  icon: "success",
                  title: "Request Submitted",
                  text: "Your customized package request has been successfully submitted. Our team will contact you shortly!",
                  confirmButtonText: "Okay",
                });
                resetForm();
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Request Submission Failed",
                  text: "Something went wrong. Please try again later.",
                  confirmButtonText: "Retry",
                });
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          {({ values, setFieldValue, errors }) => {
            console.log(errors);

            return (
              <Form className="space-y-6">
                {/* Other Fields */}
                <div>
                  <Label>Name</Label>
                  <Field
                    name="name"
                    className="border p-3 rounded-md w-full bg-white dark:bg-neutral-900 dark:border-neutral-700"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Field
                    name="email"
                    type="email"
                    className="border p-3 rounded-md w-full bg-white dark:bg-neutral-900 dark:border-neutral-700"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Mobile Input */}
                <div>
                  <Label>Mobile</Label>
                  <PhoneInput
                    country={"lk"}
                    value={values.mobile}
                    onChange={(value) => setFieldValue("mobile", value)}
                    containerClass="phone-input-container  rounded-md text-black"
                    inputClass="phone-input"
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

      {/* Arrival Date - Using DatePicker with Calendar Icon */}
      <div className="space-y-2">
  <Label>Arrival Date</Label>
  <div className="relative">
    <DatePicker
      selected={values.arrivalDate ? new Date(values.arrivalDate) : null}
      onChange={(date) => setFieldValue("arrivalDate", date)}
      className="border p-3 rounded-md w-full text-black pl-12 pr-10" // Add padding left and right for space
      dateFormat="yyyy-MM-dd"
      placeholderText="Select arrival date"
      minDate={new Date()}
    />
    <FaCalendar className="absolute top-4 left-3 text-gray-500" /> {/* Positioned inside the input field */}
  </div>
  <ErrorMessage
    name="arrivalDate"
    component="div"
    className="text-red-500 text-sm mt-1"
  />
</div>


                {/* Pickup Place */}
                <div>
                  <Label>Pickup Place</Label>
                  <Field
                    name="pickupPlace"
                    className="border p-3 rounded-md w-full bg-white dark:bg-neutral-900 dark:border-neutral-700"
                  />
                  <ErrorMessage
                    name="pickupPlace"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Country Selection */}
                <div>
                  <Label>Country</Label>
                  <Select2
                    options={countryOptions}
                    value={values.country}
                    onChange={(value) => setFieldValue("country", value)}
                    className="border p-3 rounded-md w-full bg-white dark:bg-neutral-900 dark:border-neutral-700 text-black"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Group Size */}
                <div>
                  <Label>Group Size</Label>
                  <Field
                    name="groupSize"
                    type="number"
                    min="1"
                    className="border p-3 rounded-md w-full bg-white dark:bg-neutral-900 dark:border-neutral-700"
                  />
                  <ErrorMessage
                    name="groupSize"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <FieldArray name="days">
                  {({ push, remove }) => (
                    <div>
                      <h3 className="text-xl font-semibold">Plan Your Trip</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {/* Map through days */}
                        {(values.days || []).map((day, index) => (
                          <div
                            key={index}
                            className="bg-white border border-neutral-300 p-4 rounded-lg shadow-sm hover:shadow-md"
                          >
                            <Label>Day {index + 1}</Label>

                            {/* Date Picker for each day with Calendar Icon */}
                            <div className="relative">
                              <DatePicker
                                selected={day.date ? new Date(day.date) : null}
                                onChange={(date) => setFieldValue(`days[${index}].date`, date)}
                                className="border p-3 rounded-md w-full mt-1.5 text-black pr-10"
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Select day date"
                                minDate={new Date()}
                              />
                              <FaCalendar className="absolute top-5 right-3 text-gray-500" />
                            </div>

                            <ErrorMessage
                              name={`days[${index}].date`}
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            {/* Location Select */}
                            <Field
                              as="select"
                              name={`days[${index}].location`}
                              className="border p-3 rounded-md w-full mt-2 text-black"
                            >
                              <option value="">Select Location</option>
                              {locations.map((location: any) => (
                                <option key={location?.locationId} value={location?.locationName}>
                                  {location?.locationName}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name={`days[${index}].location`}
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 mt-2"
                            >
                              Remove
                            </button>
                          </div>
                        ))}

                        {/* Add "Add Another Day" button */}
                        {(values.days || []).length < 10 && (
                          <div
                            className="bg-white border border-neutral-300 p-4 rounded-lg shadow-sm hover:shadow-md flex justify-center items-center cursor-pointer"
                            onClick={() => push({ date: "", location: "" })}
                          >
                            <div className="text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6 mx-auto mb-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 4v16M4 12h16"
                                />
                              </svg>
                              <span className="text-sm text-neutral-500">Add Another Day</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </FieldArray>

                <ButtonPrimary type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md w-full">
                  Save Package
                </ButtonPrimary>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CustomizedPackage;
