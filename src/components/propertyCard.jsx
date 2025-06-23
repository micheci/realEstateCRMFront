/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-300 transition"
      onClick={() => navigate(`/properties/${property._id}`)} // <-- Navigate to DETAIL page on card click
    >
      {/* Top Images Section */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt="Main property"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{property.title}</h3>
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              navigate(`/edit/properties/${property._id}`); // <-- Navigate to EDIT page on button click
            }}
          >
            Edit
          </button>
        </div>

        <div className="text-gray-600 mb-1">
          ${property.price.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">{property.description}</div>

        <div className="text-sm text-gray-500 mt-2">
          📍 {property.address.city}, {property.address.state}{" "}
          {property.address.zip}
        </div>

        {property.images.length > 1 && (
          <div className="flex gap-2 mt-4">
            {property.images.slice(1, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover rounded-md"
              />
            ))}
            {property.images.length > 4 && (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-600 text-sm font-medium rounded-md">
                +{property.images.length - 4}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
