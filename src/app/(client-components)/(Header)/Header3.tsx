"use client";

import React, { FC } from "react";
import Logo from "@/shared/Logo";
import MenuBar from "@/shared/MenuBar";
import Link from "next/link";
import SwitchDarkMode from "@/shared/SwitchDarkMode";

interface Header3Props {
  className?: string;
}

const Header3: FC<Header3Props> = ({ className = "" }) => {


  const renderButtonOpenHeroSearch = () => {
    return (
      <div
        className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full  shadow hover:shadow-md transition-all
            visible
          `}
      >
        <div className="flex items-center font-medium text-sm">

          <Link
            href="/travel-packages"
            className="block pl-5 pr-4 cursor-pointer py-3 "
          >
            Travel Packages
          </Link>
          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
          <Link
            href="/car-packages"
            className="block px-4 cursor-pointer py-3 "
          >
            Rent a car
          </Link>

          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>

          <Link
            href="/customize-package"
            className="block px-4 cursor-pointer font-normal py-3 "
          >
            Customize Package
          </Link>

          <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700 mr-2"></span>
          <Link
            href="/customize-package"
            className="block px-2 cursor-pointer font-normal py-2 rounded-full bg-blue-600 mr-2 text-white"
          >
            New Here? Learn How!</Link>


        </div>

      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] invisible opacity-0 pointer-events-none
          `}
      ></div>

      <header className={`sticky top-0 z-40`}>
        <div
          className={`bg-white dark:bg-neutral-900 absolute h-full inset-x-0 top-0 transition-transform will-change-[transform,opacity]
          `}
        ></div>
        <div className="relative px-4 lg:container h-[88px] flex">
          <div className="flex-1 flex justify-between">
            {/* Logo (lg+) */}
            <div className="flex flex-1 items-center space-x-4 sm:space-x-10">
              <Logo />
            </div>
            <div className="flex flex-[2] lg:flex-none mx-auto ">
              <div className="flex-1 lg:flex hidden self-center">
                {renderButtonOpenHeroSearch()}
              </div>
            </div>
            {/* NAV */}
            <div className="flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100">
              <div className="flex space-x-1">
                <SwitchDarkMode />
                <div className="px-0.5" />
                <MenuBar />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
