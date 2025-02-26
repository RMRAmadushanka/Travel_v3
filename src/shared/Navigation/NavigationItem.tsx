"use client";

import { PathName } from "@/routers/types";
import { client } from "@/utils/client";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, Fragment, useEffect, useState } from "react";


const query = `*[_type == "travelPackage"]{
  _id,
  id,
  packageName,
  images[] {
    asset-> {
      url
    },
    hotspot
  },
  duration,
  saleOff,
  price,
  locations[] {
    locationId,
    locationName,
    map {
      lat,
      lng
    }
  }
}`;

const query2 = `*[_type == "carRental"]{
            _id,
            carId,
            vehicleName,
            perDayRent,
            "galleryImgs": galleryImages[].asset->url,
            seatingCapacity,
            luggageCapacity,
            gearType,
            description,
            policies,
            "reviewStart": feedback[0].rating,
            "reviewCount": count(feedback),
            "cardImage": cardImage.asset->url  // Adding the cardImage field here
          }`

// <--- NavItemType --->
export interface MegamenuItem {
  id: string;
  image: string;
  title: string;
  Price: string;
}
export interface NavItemType {
  id: string;
  name: string;
  isNew?: boolean;
  href: PathName;
  targetBlank?: boolean;
  children?: NavItemType[];
  megaMenu?: MegamenuItem[];
  type?: "dropdown" | "megaMenu" | "none" | "megaMenu2";
}

export interface NavigationItemProps {
  menuItem: NavItemType;
}

type NavigationItemWithRouterProps = NavigationItemProps;

const NavigationItem: FC<NavigationItemWithRouterProps> = ({ menuItem }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  // CLOSE ALL MENU OPENING WHEN CHANGE HISTORY
  const locationPathName = usePathname();
  useEffect(() => {
    setMenuCurrentHovers([]);
  }, [locationPathName]);

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };

  const renderMegaMenu = (menu: NavItemType) => {
    const [travelPackages, setTravelPackages] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      client.fetch(query).then((data) => {
        const formattedData = data.map((pkg) => ({
          id: pkg._id,
          pckId: pkg.id,
          title: pkg.packageName,
          image: pkg.images || "/placeholder.jpg",
          price: pkg.price,
        }));
        setTravelPackages(formattedData);
        setLoading(false);
      });
    }, []);
  
    const isHover = menuCurrentHovers.includes(menu.id);
    const isFull = menu.megaMenu && menu.megaMenu?.length > 3;
    const classPopover = isFull ? "menu-megamenu--large" : "menu-megamenu--small relative";
    const classPanel = isFull ? "left-0" : "-translate-x-1/2 left-1/2";
    const visibleItems = travelPackages?.slice(0, 4);
  
    return (
      <Popover
        as="li"
        className={`menu-item flex items-center menu-megamenu ${classPopover}`}
        onMouseEnter={() => onMouseEnterMenu(menu.id)}
        onMouseLeave={() => onMouseLeaveMenu(menu.id)}
      >
        {() => (
          <>
            <div>{renderMainItem(menu)}</div>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className={`will-change-transform sub-menu absolute top-full transform z-10 w-screen max-w-sm px-4 sm:px-0 lg:max-w-max ${classPanel}`}
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 text-sm">
                <div
  className="relative bg-white dark:bg-neutral-900 px-3 py-9 grid gap-1 grid-cols-4"
>
                    {loading
                      ? Array.from({ length: 4 }).map((_, index) => (
                          <div key={index} className="animate-pulse">
                            <div className="px-2">
                              <div className="w-36 h-24 rounded-lg bg-gray-300 dark:bg-gray-700" />
                            </div>
                            <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 my-2 mx-2 rounded" />
                            <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 my-2 mx-2 rounded" />
                          </div>
                        ))
                      : visibleItems?.map((item) => (
                          <Link key={item.id} href={`/travel-package-detail/${item.pckId}`} passHref>
                            <div key={item.id}>
                              <div className="px-2">
                                <div className="w-36 h-24 rounded-lg overflow-hidden relative flex">
                                  <Image alt="" src={item.image[0].asset.url} fill sizes="200px" />
                                </div>
                              </div>
                              <p className="font-medium text-neutral-900 dark:text-neutral-200 py-1 px-2 my-2">
                                {item.title}
                              </p>
                              <p className="font-medium text-neutral-900 dark:text-neutral-200 py-1 px-2 my-2">
                                {item.price} LKR
                              </p>
                            </div>
                          </Link>
                        ))}
  
                    {visibleItems?.length > 3 && !loading && (
                      <div className="col-span-full mt-4">
                        <Link
                          href="/travel-packages"
                          className="inline-flex items-center text-blue-600 font-medium hover:underline"
                        >
                          See More
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };
  
  

  const renderMegaMenu2 = (menu: NavItemType) => {
    const [carPackages, setCarPackages] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      client.fetch(query2).then((data) => {
        const formattedData = data.map((pkg) => ({
          id: pkg._id,
          carId: pkg.carId,
          title: pkg.vehicleName,
          image: pkg.cardImage || "/placeholder.jpg",
          price: pkg.perDayRent
        }));
        setCarPackages(formattedData);
        setLoading(false);
      });
    }, []);
  
    const isHover = menuCurrentHovers.includes(menu.id);
    const isFull = menu.megaMenu && menu.megaMenu?.length > 3;
    const classPopover = isFull ? "menu-megamenu--large" : "menu-megamenu--small relative";
    const classPanel = isFull ? "left-0" : "-translate-x-1/2 left-1/2";
    const visibleItems = loading ? new Array(4).fill(null) : carPackages?.slice(0, 4);
  
    return (
      <Popover
        as="li"
        className={`menu-item flex items-center menu-megamenu ${classPopover}`}
        onMouseEnter={() => onMouseEnterMenu(menu.id)}
        onMouseLeave={() => onMouseLeaveMenu(menu.id)}
      >
        {() => (
          <>
            <div>{renderMainItem(menu)}</div>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className={`will-change-transform sub-menu absolute top-full transform z-10 w-screen max-w-sm px-4 sm:px-0 lg:max-w-max ${classPanel}`}
              >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 text-sm">
                  <div className={`relative bg-white dark:bg-neutral-900 px-3 py-6 grid gap-1 grid-cols-${visibleItems?.length}`}> 
                    {visibleItems?.map((item, index) => (
                      item ? (
                        <Link key={item.id} href={`/car-packages/listing-car-detail/${item.carId}`} passHref>
                          <div className="border border-gray-500 rounded-lg border-opacity-15">
                            <div className="px-2">
                              <div className="w-36 h-24 rounded-lg overflow-hidden relative flex">
                                <Image alt="" src={item.image} fill sizes="200px" />
                              </div>
                            </div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-200 py-1 px-2 my-2">{item.title}</p>
                            <p className="font-medium text-neutral-900 dark:text-neutral-200 py-1 px-2 my-2">{item.price} LKR/Day</p>
                          </div>
                        </Link>
                      ) : (
                        <div key={index} className="border border-gray-300 rounded-lg p-3 animate-pulse">
                          <div className="w-36 h-24 bg-gray-300 rounded-md"></div>
                          <div className="h-4 bg-gray-300 rounded-md w-3/4 mt-2"></div>
                          <div className="h-4 bg-gray-300 rounded-md w-1/2 mt-2"></div>
                        </div>
                      )
                    ))}
                    {visibleItems?.length > 3 && !loading && (
                      <div className="col-span-full mt-4">
                        <Link href="/car-packages" className="inline-flex items-center text-blue-600 font-medium hover:underline">
                          See More
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };



  // ===================== MENU DROPDOW =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id);
    return (
      <Popover
        as="li"
        className={`menu-item flex items-center menu-dropdown relative ${
          menuDropdown.isNew ? "menuIsNew_lv1" : ""
        }`}
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <div>{renderMainItem(menuDropdown)}</div>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150 "
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu will-change-transform absolute transform z-10 w-56 top-full left-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {menuDropdown.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li
                          key={i.id}
                          className={`px-2 ${i.isNew ? "menuIsNew" : ""}`}
                        >
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
    const isHover = menuCurrentHovers.includes(item.id);
    return (
      <Popover
        as="li"
        key={item.id}
        className="menu-item flex items-center menu-dropdown relative px-2"
        onMouseEnter={() => onMouseEnterMenu(item.id)}
        onMouseLeave={() => onMouseLeaveMenu(item.id)}
      >
        {() => (
          <>
            <div>{renderDropdownMenuNavlink(item)}</div>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {item.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlink = (item: NavItemType) => {
    return (
      <Link
        target={item.targetBlank ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="flex items-center font-normal text-neutral-6000 dark:text-neutral-300 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 "
        href={item.href || ""}
      >
        {item.name}
        {item.type && (
          <ChevronDownIcon
            className="ml-2 h-4 w-4 text-neutral-500"
            aria-hidden="true"
          />
        )}
      </Link>
    );
  };

  // ===================== MENU MAIN MENU =====================
  const renderMainItem = (item: NavItemType) => {
    return (
      <Link
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        href={item.href || "/"}
      >
        {item.name}
        {item.type !== "none" && (
  <ChevronDownIcon
    className="ml-1 -mr-1 h-4 w-4 text-neutral-400"
    aria-hidden="true"
  />
)}
      </Link>
    );
  };

  switch (menuItem.type) {
    case "megaMenu":
      return renderMegaMenu(menuItem);
    case "megaMenu2":
        return renderMegaMenu2(menuItem);
    case "dropdown":
      return renderDropdownMenu(menuItem);
    default:
      return (
        <li className="menu-item flex items-center">
          {renderMainItem(menuItem)}
        </li>
      );
  }
};
// Your component own properties

export default NavigationItem;
