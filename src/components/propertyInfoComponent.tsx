import React from "react";

interface Property {
  id: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  description: string;
  images: string[];
  agentId: string;
}

// Using the same interface but defining property as a prop inside an object
const PropertyInfoComponent = ({ property }: { property: Property }) => {
  return (
    <div className="w-full lg:w-3/4 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{property.address}</h2>
      <p className="text-lg font-bold text-green-600">{property.price}</p>
      <p>
        <strong>Bedrooms:</strong> {property.bedrooms} |{" "}
        <strong>Bathrooms:</strong> {property.bathrooms} |{" "}
        <strong>Size:</strong> {property.sqft}
      </p>
      <p className="mt-2">{property.description}</p>
    </div>
  );
};

export default PropertyInfoComponent;
