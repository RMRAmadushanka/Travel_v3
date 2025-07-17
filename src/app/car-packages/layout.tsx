"use client";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
const DetailtLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div className="ListingDetailPage">
      <div className="container ListingDetailPage__content">{children}</div>
      <ToastContainer/>
    </div>
  );
};

export default DetailtLayout;
