import React, { FC, Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";

export interface StayDatesRangeInputProps {
  className?: string;
  days?: number;
  onDatesChange?: (startDate: string | null, endDate: string | null) => void; // Pass formatted date strings
  reset?: boolean;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  days, 
  onDatesChange, 
  reset = false
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (reset) {
      setStartDate(null);
      setEndDate(null);
      onDatesChange?.(null, null); // Pass null to parent
    }
  }, [reset]);

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (start && end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays + 1 === days) {
        setStartDate(start);
        setEndDate(end);

        // Format the dates with the year
        const formattedStartDate = start.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        const formattedEndDate = end.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });

        onDatesChange?.(formattedStartDate, formattedEndDate); // Pass formatted dates to parent
      } else {
        setEndDate(null);
      }
    } else {
      setStartDate(start);
      setEndDate(end);

      // Format the dates with the year
      const formattedStartDate = start ? start.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }) : null;
      const formattedEndDate = end ? end.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }) : null;

      onDatesChange?.(formattedStartDate, formattedEndDate); // Pass formatted dates to parent
    }
  };

  const minDate = startDate;
  const maxDate = startDate
    ? new Date(startDate.getTime() + (days - 1) * 24 * 60 * 60 * 1000)
    : null;

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400 ml-3">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }) || "Add dates"}
            {endDate
              ? " - " + endDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : ""}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"Check in - Check out"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
              open ? "shadow-lg" : ""
            }`}
          >
            {renderInput()}
            {startDate && open && (
              <ClearDataButton onClick={() => onChangeDate([null, null])} />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-10 mt-3 top-full w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={startDate}
                  onChange={onChangeDate}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  minDate={minDate}
                  maxDate={maxDate}
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInput;
