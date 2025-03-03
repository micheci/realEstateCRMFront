/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-4 shadow rounded-lg flex flex-col items-center relative"
      onClick={() => navigate(`/edit/properties/${property._id}`)}
    >
      {/* Header with Edit Button */}
      <div className="w-full text-center relative">
        <h3 className="font-bold text-lg">{property.title}</h3>
        <button className="text-blue-500 hover:underline absolute top-0 right-4">
          Edit
        </button>
      </div>

      {/* Property Details */}
      <div className="text-center mt-2">
        <p>
          <span className="font-medium">Price:</span> ${property.price}
        </p>
        <p>
          <span className="font-medium">Description:</span>{" "}
          {property.description}
        </p>
        <p>
          <span className="font-medium">Address:</span> {property.address.city},{" "}
          {property.address.state} {property.address.zip}
        </p>
      </div>

      {/* Property Images at the Bottom */}
      <div className="flex gap-2 mt-4">
        {property.images.slice(0, 3).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Property ${index + 1}`}
            className="h-24 w-24 object-cover rounded-lg shadow-md"
          />
        ))}

        {/* Show "..." if there are more than 3 images */}
        {property.images.length > 3 && (
          <div className="h-24 w-24 flex items-center justify-center bg-gray-200 rounded-lg shadow-md text-gray-600 text-xl font-bold">
            ...
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
