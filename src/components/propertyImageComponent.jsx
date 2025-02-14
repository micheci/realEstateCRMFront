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

  const imagesPerPage = isMobile ? 1 : 8; // Show 1 image on mobile, 8 images on larger screens
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Get the images for the current page
  const currentImages = images.slice(
    page * imagesPerPage,
    (page + 1) * imagesPerPage
  );

  return (
    <div className="flex flex-col items-center w-full">
      {/* Navigation Buttons */}
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        disabled={page === 0}
        className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50 mb-2"
      >
        ← Prev
      </button>

      {/* Image Display */}
      <div
        className={`grid ${
          isMobile ? "grid-cols-1" : "grid-cols-4 grid-rows-2"
        } gap-2 w-full max-w-screen-xl mx-4`}
      >
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

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
        className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50 mt-2"
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
