import React, { FC } from "react";
import Checkbox from "@/shared/Checkbox";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";

export interface PageAddListing4Props {}

const PageAddListing4: FC<PageAddListing4Props> = () => {
  const renderNoInclude = (text: string) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
          {text}
        </span>
        <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"></i>
      </div>
    );
  };
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Specify Your Travel Locations</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Mention the places you wish to travel to. This will help us customize your travel package.
        </span>
      </div>
    
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div className=" border-b border-neutral-200 dark:border-neutral-700"></div>
        <span className="block text-lg font-semibold">Preferred Travel Locations</span>
        <div className="flow-root">
          <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
            {renderNoInclude("Paris")}
            {renderNoInclude("Tokyo")}
            {renderNoInclude("USA")}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
          <Input className="!h-full" placeholder="No smoking..." />
          <ButtonPrimary className="flex-shrink-0">
            <i className="text-xl las la-plus"></i>
            <span className="ml-3">Add tag</span>
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default PageAddListing4;
