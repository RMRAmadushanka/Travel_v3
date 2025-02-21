"use client";

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import { client } from "@/utils/client";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
}

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Search travel packages including your dream destination...",
  desc = "Where are you going?",
  className = "nc-flex-1.5 opacity-20",
  divHideVerticalLineClass = "left-10 -right-0.5",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Initialize the useRouter hook for navigation
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(autoFocus);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setShowSuggestions(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (showSuggestions && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSuggestions]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "travelPackage"] {
            locations[] {
              locationName
            }
          }`
        );

        const locationNames = data.flatMap((pkg: any) =>
          pkg.locations.map((loc: any) => loc.locationName)
        );
        setSuggestions(locationNames);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSelectLocation = (item: string) => {
    setSearchValue(item);
    setShowSuggestions(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const renderSearchValue = () => {
    const filteredSuggestions = suggestions.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredSuggestions.length === 0) {
      return (
        <div className="px-4 sm:px-8 py-4 text-neutral-500 text-center">
          No results found
        </div>
      );
    }

    return filteredSuggestions.map((item) => (
      <div
        onClick={() => handleSelectLocation(item)}
        key={item}
        className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
      >
        <span className="block text-neutral-400">
          <ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
        </span>
        <span className="block font-medium text-neutral-700 dark:text-neutral-200">
          {item}
        </span>
      </div>
    ));
  };
        console.log(`/listing-stay-map?location=${encodeURIComponent(searchValue)}`);
  const handleNavigate = () => {



    // Pass the search value to the URL query to filter packages by location
    router.push(`/listing-stay-map?location=${encodeURIComponent(searchValue)}`);

  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        className={`flex-1 z-10 flex items-center focus:outline-none ${
          showSuggestions ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="relative z-10 flex-1 flex text-left items-center space-x-3 focus:outline-none p-4">
          <div className="text-neutral-300 dark:text-neutral-400">
            <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
          </div>
          <div className="flex-grow">
            <input
              className="block w-full bg-transparent border-none focus:ring-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
              placeholder={placeHolder}
              value={searchValue}
              autoFocus={showSuggestions}
              onChange={(e) => {
                e.preventDefault(); 
                setSearchValue(e.currentTarget.value);
                setShowSuggestions(true); // Ensure suggestions are displayed while typing
              }}
              ref={inputRef}
            />
          </div>

          {searchValue && showSuggestions && (
            <ClearDataButton
              onClick={() => {
                setSearchValue("");
              }}
            />
          )}
        </div>

        <div className="pr-2 xl:pr-4">
          <ButtonSubmit onClick={(e) => { 
    e.preventDefault(); 
    handleNavigate(); 
}}  /> {/* Use onClick to trigger navigation */}
        </div>
      </div>

      {showSuggestions && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          <div className="absolute left-0 top-0 w-full h-3 bg-gradient-to-t from-white dark:from-neutral-800 shadow-sm"></div>
          {renderSearchValue()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
