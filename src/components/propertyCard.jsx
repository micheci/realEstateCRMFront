/* eslint-disable react/prop-types */
import { useState } from "react";

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg relative flex flex-col">
      {/* Header with Edit Button */}
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">{property.title}</h3>
        <button className="text-blue-500 hover:underline">Edit</button>
      </div>

      {/* Property Details & Image */}
      <div className="flex flex-row mt-2">
        {/* Property Details */}
        <div>
          <p>
            <span className="font-medium">Price:</span> ${property.price}
          </p>
          <p>
            <span className="font-medium">Description:</span>{" "}
            {property.description}
          </p>
          <p>
            <span className="font-medium">Address:</span>{" "}
            {property.address.city}, {property.address.state}{" "}
            {property.address.zip}
          </p>
        </div>

        {/* Property Image Carousel */}
        <div className="relative ml-4">
          <img
            src={property.images[currentImageIndex]}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            className="h-32 w-32 object-cover rounded-lg shadow-md"
          />

          {/* Navigation Buttons */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
              >
                ▶
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
