import { MegamenuItem, NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 1",
    Price:"20000 LKR"
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 2",
    Price:"30000 LKR"
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 3",
    Price:"40000 LKR"
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 4",
    Price:"50000 LKR"
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 5",
    Price:"60000 LKR"
  },
];

const megaMenuDemo2: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 1",
    Price:"20000 LKR"
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 2",
    Price:"30000 LKR"
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 3",
    Price:"40000 LKR"
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 4",
    Price:"50000 LKR"
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Package 5",
    Price:"60000 LKR"
  },
];

const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/travel-packages",
    name: "Travel Packages",
  },
  {
    id: ncNanoId(),
    href: "/car-packages",
    name: "Car",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/customize-package",
    name: "Customized",
    isNew: true,
  },
];

const otherPageChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/blog", name: "Blog page" },
  { id: ncNanoId(), href: "/blog/single" as Route, name: "Blog single" },
  { id: ncNanoId(), href: "/about", name: "About" },
  { id: ncNanoId(), href: "/contact", name: "Contact us" },
  { id: ncNanoId(), href: "/login", name: "Login" },
  { id: ncNanoId(), href: "/signup", name: "Signup" },
];

const templatesChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/add-listing/1" as Route,
    name: "Add listing",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/add-listing/1" as Route,
        name: "Add listing 1",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/2" as Route,
        name: "Add listing 2",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/3" as Route,
        name: "Add listing 3",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/4" as Route,
        name: "Add listing 4",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/5" as Route,
        name: "Add listing 5",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/6" as Route,
        name: "Add listing 6",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/7" as Route,
        name: "Add listing 7",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/8" as Route,
        name: "Add listing 8",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/9" as Route,
        name: "Add listing 9",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/10" as Route,
        name: "Add listing 10",
      },
    ],
  },
  //
  { id: ncNanoId(), href: "/checkout", name: "Checkout" },
  { id: ncNanoId(), href: "/pay-done", name: "Pay done" },
  //
  { id: ncNanoId(), href: "/author", name: "Author page" },
  { id: ncNanoId(), href: "/account", name: "Account page" },
  //
  {
    id: ncNanoId(),
    href: "/subscription",
    name: "Subscription",
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/travel-packages",
    name: "Travel Packages",
    type: "megaMenu",
    megaMenu: megaMenuDemo,
  },
  {
    id: ncNanoId(),
    href: "/car-packages",
    name: "Cars",
    type: "megaMenu2",
    megaMenu: megaMenuDemo2,
  },
  {
    id: ncNanoId(),
    href: "/customize-package",
    name: "Customize Yourself",
    type: "none",
   
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
    isNew: true,
  },

  //
  {
    id: ncNanoId(),
    href: "/listing-stay",
    name: "Listing pages",
    children: [
      { id: ncNanoId(), href: "/listing-stay", name: "Stay listings" },
      {
        id: ncNanoId(),
        href: "/listing-stay-map",
        name: "Stay listings (map)",
      },
      { id: ncNanoId(), href: "/listing-stay-detail", name: "Stay detail" },

      //
      {
        id: ncNanoId(),
        href: "/listing-experiences",
        name: "Experiences listings",
      },
      {
        id: ncNanoId(),
        href: "/listing-experiences-map",
        name: "Experiences (map)",
      },
      {
        id: ncNanoId(),
        href: "/listing-experiences-detail",
        name: "Experiences detail",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/listing-car",
    name: "Listing pages",
    children: [
      { id: ncNanoId(), href: "/listing-car", name: "Cars listings" },
      { id: ncNanoId(), href: "/listing-car-map", name: "Cars listings (map)" },
      { id: ncNanoId(), href: "/listing-car-detail", name: "Car detail" },

      //
      {
        id: ncNanoId(),
        href: "/listing-real-estate",
        name: "Real estate listings",
      },
      {
        id: ncNanoId(),
        href: "/listing-real-estate-map",
        name: "Real estate (map)",
      },
      //
      {
        id: ncNanoId(),
        href: "/listing-flights",
        name: "Flights listings",
      },
    ],
  },

  //
  {
    id: ncNanoId(),
    href: "/author",
    name: "Templates",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  //
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Other pages",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];
