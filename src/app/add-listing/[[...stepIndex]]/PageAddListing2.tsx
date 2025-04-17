"use client";

import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import FormItem from "../FormItem";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
    const [dates, setDates] = useState<number[]>([
      new Date("2023/02/06").getTime(),
      new Date("2023/02/09").getTime(),
      new Date("2023/02/15").getTime(),
    ]);
  return (
    <>
      <h2 className="text-2xl font-semibold">Traveler's Arrival and Pickup Details</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Pickup Location">
          <Input />
        </FormItem>
        <div>
  <h2 className="text-2xl font-semibold">Select Your Arrival Date</h2>
  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
    Please select your arrival date for the travel package.
  </span>
</div>
        <div className="addListingDatePickerExclude">
                <DatePicker
                  onChange={(date) => {
                    let newDates = [];
        
                    if (!date) {
                      return;
                    }
                    const newTime = date.getTime();
                    if (dates.includes(newTime)) {
                      newDates = dates.filter((item) => item !== newTime);
                    } else {
                      newDates = [...dates, newTime];
                    }
                    setDates(newDates);
                  }}
                  // selected={startDate}
                  monthsShown={2}
                  showPopperArrow={false}
                  excludeDates={dates.filter(Boolean).map((item) => new Date(item))}
                  inline
                  renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
      </div>
    </>
  );
};

export default PageAddListing2;
