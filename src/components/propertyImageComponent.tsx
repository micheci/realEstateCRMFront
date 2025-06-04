import { useState } from "react";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
  images: string[]; // full list of URLs
};

const PropertyImageComponent: React.FC<Props> = ({ images }) => {
  // index of the *main* image we’re currently showing
  const [start, setStart] = useState(0);

  // convenience helpers
  const total = images.length;
  const canNavigate = total > 5; // only show arrows if needed
  const prev = () => setStart((start - 1 + total) % total);
  const next = () => setStart((start + 1) % total);

  // build the current view: main + four that follow it
  const mainImage = images[start];
  const thumbImages = Array.from(
    { length: 4 },
    (_, i) => images[(start + i + 1) % total]
  );

  return (
    <div className="relative flex w-full max-w-6xl mx-auto gap-4">
      {/* LEFT ARROW */}
      {canNavigate && (
        <button
          onClick={prev}
          className="absolute -left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
      )}

      {/* MAIN IMAGE */}
      <div className="flex-1 h-[500px]">
        <img
          src={mainImage}
          alt="Main"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* 2×2 THUMBNAILS */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[40%]">
        {thumbImages.map((img, i) => (
          <div key={i} className="h-[240px]">
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      {canNavigate && (
        <button
          onClick={next}
          className="absolute -right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default PropertyImageComponent;
