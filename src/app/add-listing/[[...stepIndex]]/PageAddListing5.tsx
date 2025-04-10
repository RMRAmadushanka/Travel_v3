import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";

export interface PageAddListing5Props {}

const PageAddListing5: FC<PageAddListing5Props> = () => {
  
  return (
    <>
          <div>
        <h2 className="text-2xl font-semibold">
        Provide Additional Details About Your Travel Experience
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
        Share any additional details about your trip, such as your accommodation preferences, any special requests, and things you love about your travel destination.

        </span>
      </div>

      <Textarea placeholder="..." rows={14} />
    </>
  );
};

export default PageAddListing5;
