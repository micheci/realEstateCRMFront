import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const PropertyImageComponent = ({ images }) => {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imagesPerPage = 2; // Show 2 images at a time regardless of screen size
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const currentImages = images.slice(
    page * imagesPerPage,
    (page + 1) * imagesPerPage
  );

  return (
    <div className="flex flex-col items-center w-full">
      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-screen-md px-4 mb-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          ← Prev
        </button>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* Image Display (2 images side by side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-screen-md px-4">
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
    </div>
  );
};

PropertyImageComponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PropertyImageComponent;
