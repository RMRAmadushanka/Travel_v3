import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
       <ToastContainer/>
      {children}
      
    </div>
  );
};

export default Layout;
