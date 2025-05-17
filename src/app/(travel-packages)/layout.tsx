import { Metadata } from "next";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Discover Sri Lanka travel packages",
  description:
    "Discover Sri Lanka packages on Ceylon Travels Guide. Pick dates & top spots: Sigiriya, Kandy, Ella, Galle & more. Includes hotels, vehicles & budget prices.",
};
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
       <ToastContainer/>
      {children}
      
    </div>
  );
};

export default Layout;
