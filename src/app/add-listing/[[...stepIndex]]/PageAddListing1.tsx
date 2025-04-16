import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";

export interface PageAddListing1Props { }

const PageAddListing1: FC<PageAddListing1Props> = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Personal Information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem
          label="Name"
          desc="Please provide your full name to help us personalize your travel package."
        >
          <Input placeholder="Enter your name" />
        </FormItem>
        <FormItem
          label="Email"
          desc="We will send the details of your customized package to this email address."
        >
          <Input placeholder="Enter your name" />
        </FormItem>
        <FormItem
          label="Phone Number"
          desc="Provide a contact number so we can reach you for any updates."
        >
          <Input placeholder="Enter phone number" />
        </FormItem>
      </div>
    </>
  );
};

export default PageAddListing1;
