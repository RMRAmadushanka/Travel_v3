"use client";

import React, { useRef } from "react";

import Header from "./Header";

import { useThemeMode } from "@/utils/useThemeMode";


export type SiteHeaders = "Header 1" | "Header 2" | "Header 3";

const SiteHeader = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  //
  useThemeMode();
  //
  return (
    <>
      <Header className="shadow-sm dark:border-b dark:border-neutral-700" />
      <div ref={anchorRef} className="h-1 absolute invisible"></div>
    </>
  );
};

export default SiteHeader;
