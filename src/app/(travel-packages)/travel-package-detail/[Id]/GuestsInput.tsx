import React, { Fragment, FC, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import { GuestsObject } from "@/app/(client-components)/type";

type onTotalGuestsValuesChange = (
  guestAdults: number,
  guestChildren: number,
  guestInfants: number
) => void;

export interface GuestsInputProps {
  fieldClassName?: string;
  className?: string;
  hasButtonSubmit?: boolean;
  onTotalGuestsChange?: (totalGuests: number) => void;
  onTotalGuestsValuesChange?: onTotalGuestsValuesChange;
  reset?: () => void; // Change reset to a function
}

const GuestsInput: FC<GuestsInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  hasButtonSubmit = true,
  reset,
  onTotalGuestsChange,
  onTotalGuestsValuesChange
}) => {
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(0);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);

  // Handle reset function
  useEffect(() => {
    if (reset) {
      reset(); // Call the reset function from parent
      setGuestAdultsInputValue(0);
      setGuestChildrenInputValue(0);
      setGuestInfantsInputValue(0);
      if (onTotalGuestsChange) onTotalGuestsChange(0);
    }
  }, [reset]);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }

    const totalGuests = newValue.guestAdults + newValue.guestChildren + newValue.guestInfants;

    if (onTotalGuestsChange) {
      onTotalGuestsChange(totalGuests);
      onTotalGuestsValuesChange?.(newValue.guestAdults, newValue.guestChildren, newValue.guestInfants);
    }
  };

  const totalGuests = guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div className={`flex-1 z-10 flex items-center focus:outline-none ${open ? "nc-hero-field-focused" : ""}`}>
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {totalGuests || ""} Guests
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {totalGuests ? "Guests" : "Add guests"}
                </span>
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestAdultsInputValue(0);
                    setGuestChildrenInputValue(0);
                    setGuestInfantsInputValue(0);
                    if (onTotalGuestsChange) onTotalGuestsChange(0);
                  }}
                />
              )}
            </Popover.Button>
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={guestAdultsInputValue}
                onChange={(value) => handleChangeData(value, "guestAdults")}
                label="Adults"
                desc="Ages 13 or above"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestChildrenInputValue}
                onChange={(value) => handleChangeData(value, "guestChildren")}
                label="Children"
                desc="Ages 2–12"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestInfantsInputValue}
                onChange={(value) => handleChangeData(value, "guestInfants")}
                label="Infants"
                desc="Ages 0–2"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
