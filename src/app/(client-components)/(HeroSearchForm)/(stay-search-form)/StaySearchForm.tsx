import React, { FC } from "react";
import LocationInput from "../LocationInput";

const StaySearchForm: FC<{}> = ({}) => {
  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        <LocationInput className="flex-[1.5]" />
  
 

      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
