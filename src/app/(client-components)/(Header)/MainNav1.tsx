import React, { FC } from "react";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import MenuBar from "@/shared/MenuBar";
import SwitchDarkMode from "@/shared/SwitchDarkMode";

export interface MainNav1Props {
  className?: string;
}

const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  return (
    <div className={`nc-MainNav1 relative z-10 ${className}`}>
      <div className="px-4 lg:container h-20 relative flex justify-between items-center">
        {/* Logo and Navigation */}
        <div className="flex flex-1 items-center space-x-4 sm:space-x-10">
          <Logo className="w-24 self-center" />
          <Navigation />
        </div>


        {/* Mobile controls */}
        <div className="flex items-center lg:hidden">
          <SwitchDarkMode />
          <div className="px-0.5" />
          <MenuBar />
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
