
import BgGlassmorphism from "@/components/BgGlassmorphism";
import React, { ReactNode } from "react";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";



const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />
      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-28">
      <SectionOurFeatures />
      </div>
      {children}
      <ToastContainer/>
    </div>
  );
};

export default Layout;
