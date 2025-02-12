import { useState } from "react";
import PropTypes from "prop-types";

const PropertyImageComponent = ({ images }) => {
  const [page, setPage] = useState(0);
  const imagesPerPage = 8; // 4x2 layout

  // Calculate total pages
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Get the images for the current page
  const currentImages = images.slice(
    page * imagesPerPage,
    (page + 1) * imagesPerPage
  );

  return (
    <div className="flex flex-row items-center w-full">
      {/* Left Arrow */}
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
        className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        ← Prev
      </button>

      {/* Image Grid (4x2) */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full max-w-screen-xl mx-4">
        {currentImages.map((img, index) => (
          <div key={index} className="w-full h-60">
            <img
              src={img}
              alt={`Property ${index}`}
              className="w-full h-full object-cover rounded-md shadow-md"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
        className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
};

// PropTypes
PropertyImageComponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PropertyImageComponent;
