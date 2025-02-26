"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect, useState } from "react";

export interface FiveStartIconForRateProps {
  className?: string;
  iconClass?: string;
  defaultPoint?: number;
  onChange?: (point: number) => void; // Callback function for parent
}

const FiveStartIconForRate: FC<FiveStartIconForRateProps> = ({
  className = "",
  iconClass = "w-4 h-4",
  defaultPoint = 5,
  onChange, // Receive the function from parent
}) => {
  const [point, setPoint] = useState(defaultPoint);
  const [currentHover, setCurrentHover] = useState(0);

  useEffect(() => {
    setPoint(defaultPoint);
  }, [defaultPoint]);

  const handleClick = (selectedPoint: number) => {
    setPoint(selectedPoint);
    if (onChange) {
      onChange(selectedPoint); // Send the value to the parent
    }
  };

  return (
    <div
      className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
      data-nc-id="FiveStartIconForRate"
    >
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <StarIcon
            key={item}
            className={`${
              point >= item || currentHover >= item ? "text-yellow-500" : ""
            } ${iconClass}`}
            onMouseEnter={() => setCurrentHover(item)}
            onMouseLeave={() => setCurrentHover(0)}
            onClick={() => handleClick(item)}
          />
        );
      })}
    </div>
  );
};

export default FiveStartIconForRate;
