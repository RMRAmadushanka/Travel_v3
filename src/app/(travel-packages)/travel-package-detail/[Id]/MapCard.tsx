import React, { useState } from 'react';

type Props = {
  img: string;
  title: string;
  subTitle: string;
  desc: string;
  rating: number;
};

export const MapCard = (props: Props) => {
  const [favorite, setFavorite] = useState(false);
  const [like, setLike] = useState(false);

  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      {/* Card Media */}
      <img
        src={props.img}
        alt="city picture"
        className="w-full h-[200px] object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-primary mt-4">
          {props.title}
        </h2>
        <h3 className="text-xs mt-1 font-heading tracking-widest text-gray-400 font-bold uppercase">
          {props.subTitle}
        </h3>
        <p className="tracking-wide text-sm lg:text-base mt-2 text-gray-600">
          {props.desc}
        </p>
      </div>

      {/* Card Actions */}
      <div className="flex items-center p-4 border-t border-gray-200">
        <button
          onClick={() => setFavorite(!favorite)}
          className="flex items-center text-gray-700 hover:text-rose-500 focus:outline-none transition-colors"
        >

          <span className="ml-2 text-sm">4.5k</span>
        </button>

        <button
          onClick={() => setLike(!like)}
          className="ml-4 flex items-center text-gray-700 hover:text-amber-500 focus:outline-none transition-colors"
        >
 
          <span className="ml-2 text-sm">5.5k</span>
        </button>
      </div>
    </div>
  );
};
