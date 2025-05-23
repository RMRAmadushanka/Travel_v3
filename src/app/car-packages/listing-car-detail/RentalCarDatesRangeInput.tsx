"use client";

import React, { Fragment, useEffect, useState } from "react";
import { FC } from "react";
import DatePicker from "react-datepicker";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";

export interface RentalCarDatesRangeInputProps {
  className?: string;
  onDaysChange: (days: number, startDate: Date | null, endDate: Date | null) => void;
  reset?: () => void;
}

const RentalCarDatesRangeInput: FC<RentalCarDatesRangeInputProps> = ({
  className = "",
  onDaysChange,
  reset = () => {},
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const calculateDateRange = (start: Date | null, end: Date | null): number => {
    if (!start || !end) return 0;
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  useEffect(() => {
    reset();
    setStartDate(null);
    setEndDate(null);
    onDaysChange(0, null, null);
  }, [reset]);

  const onChangeDate = (dates: [Date | null, Date | null], close: () => void) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDaysChange(calculateDateRange(start, end), start, end);

    // Close dropdown if both start & end dates are selected
    if (start && end) {
      close();
    }
  };

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toLocaleDateString("en-US", { month: "short", day: "2-digit" }) || "Add dates"}
            {endDate
              ? " - " + endDate?.toLocaleDateString("en-US", { month: "short", day: "2-digit" })
              : ""}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            Pick up - Drop off
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`RentalCarDatesRangeInput relative flex w-full ${className}`}>
      {({ open, close }) => (
        <>
          <div className={`flex-1 flex items-center focus:outline-none rounded-2xl ${open ? "shadow-lg" : ""}`}>
            <Popover.Button className="flex-1 flex relative p-3 items-center space-x-3 focus:outline-none">
              {renderInput()}
              {startDate && open && <ClearDataButton onClick={() => onChangeDate([null, null], close)} />}
            </Popover.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 mt-3 top-full w-screen px-4 sm:px-0 max-w-2xl 
              sm:right-0 sm:xl:-right-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => onChangeDate(dates, close)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  minDate={new Date()}
                  renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
                  renderDayContents={(day, date) => <DatePickerCustomDay dayOfMonth={day} date={date} />}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default RentalCarDatesRangeInput;
