"use client";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import CarRentalHero from "./CarRentalHero";
const DetailtLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div className="ListingDetailPage">
      <div>{children}</div>
      <ToastContainer/>
    </div>
  );
};

export default DetailtLayout;
