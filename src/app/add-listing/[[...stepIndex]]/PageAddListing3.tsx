import NcInputNumber from "@/components/NcInputNumber";
import React, { FC } from "react";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import Input from "@/shared/Input";

export interface PageAddListing3Props {}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Traveler's Country and Group Details</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Your country">
          <Input />
        </FormItem>
        <div>
  <h2 className="text-2xl font-semibold">Group Details</h2>
  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
  Please provide details about your group for the travel package.
  </span>
</div>
      
        <NcInputNumber label="Adults" defaultValue={4} />
        <NcInputNumber label="Children" defaultValue={4} />
        <NcInputNumber label="Infants" defaultValue={2} />

      </div>
    </>
  );
};

export default PageAddListing3;
