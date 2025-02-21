import BgGlassmorphism from "@/components/BgGlassmorphism";
import MobileFooterSticky from "@/components/MobileFooterSticky";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      
      {children}
  
    </div>
  );
};

export default Layout;
