
import BgGlassmorphism from "@/components/BgGlassmorphism";
import React, { ReactNode } from "react";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import ContactUs from "./ContactUs";



const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <ContactUs/>
      <ToastContainer/>
    </div>
  );
};

export default Layout;
