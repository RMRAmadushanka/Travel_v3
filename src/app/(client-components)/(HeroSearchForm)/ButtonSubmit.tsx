import React, { FC } from "react";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonSubmit: FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="h-14 w-14 md:h-16 md:w-16 sm:h-16 sm:w-16 aspect-square 
                 rounded-full bg-sky-600 sm:bg-sky-500 hover:bg-sky-400 sm:hover:bg-sky-300 
                 flex items-center justify-center text-neutral-50 focus:outline-none"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
};

export default ButtonSubmit;
