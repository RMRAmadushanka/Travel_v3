"use client";
import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import MobileFooterSticky from "../../components/MobileFooterSticky";
import { imageGallery as listingCarImageGallery } from "./listing-car-detail/constant";

const DetailLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("modal");

    const newUrl = params.toString() ? `${thisPathname}?${params.toString()}` : thisPathname;
    router.push(newUrl);
  };

  return (
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={listingCarImageGallery}
      />
      <div className="container ListingDetailPage__content">{children}</div>
      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailLayout;
