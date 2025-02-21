import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "@/shared/Avatar";

interface CommentListingDataType {
  userName: string;
  userId?:string,
  avatar?: string;
  comment: string;
  rating: number;
  carId?:string
}

export interface CommentListingProps {
  className?: string;
  data?: CommentListingDataType;
  hasListingTitle?: boolean;
}


const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data,
  hasListingTitle,
}) => {
  const renderStars = (rating: number) => {
    // Create an array of 5 stars and fill them accordingly
    return Array.from({ length: 5 }, (_, index) => {
      return index < rating ? (
        <StarIcon key={index} className="w-4 h-4 text-yellow-500" />
      ) : (
        ""
        
      );
    });
  };
  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          sizeClass="h-10 w-10 text-lg"
          radius="rounded-full"
          userName={data?.userName}
          imgUrl={""}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{data?.userName}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div>
          </div>
          <div className="flex text-yellow-500">
  
          {renderStars(data?.rating || 0)}
            
          </div>
        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
          {data?.comment}
        </span>
      </div>
    </div>
  );
};

export default CommentListing;
