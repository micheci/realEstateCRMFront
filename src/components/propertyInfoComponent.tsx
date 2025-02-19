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
  features: {
    garage: boolean;
    parkingSpaces: number;
    swimmingPool: boolean;
    fireplace: boolean;
    basement: boolean;
    finishedBasement: boolean;
    attic: boolean;
    airConditioning: boolean;
    remodeled: boolean;
    securitySystem: boolean;
    smartHome: boolean;
    fence: boolean;
    hoaFees: number;
    petsAllowed: boolean;
    walkInClosets: boolean;
  };
}

const PropertyInfoComponent = ({ property }: { property: Property }) => {
  return (
    <div className="w-full lg:w-3/4 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-3">{property.address}</h2>
      <p className="text-xl font-bold text-green-600">{property.price}</p>
      <div className="mt-3 text-gray-700">
        <p>
          <strong>Bedrooms:</strong> {property.bedrooms} |{" "}
          <strong>Bathrooms:</strong> {property.bathrooms} |{" "}
          <strong>Size:</strong> {property.sqft}
        </p>
      </div>
      <p className="mt-4 text-gray-600">{property.description}</p>

      {/* Features Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Property Features</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            <strong>Garage:</strong> {property.features.garage ? "Yes" : "No"}
          </li>
          <li>
            <strong>Parking Spaces:</strong> {property.features.parkingSpaces}
          </li>
          <li>
            <strong>Swimming Pool:</strong>{" "}
            {property.features.swimmingPool ? "Yes" : "No"}
          </li>
          <li>
            <strong>Fireplace:</strong>{" "}
            {property.features.fireplace ? "Yes" : "No"}
          </li>
          <li>
            <strong>Basement:</strong>{" "}
            {property.features.basement ? "Yes" : "No"}
          </li>
          <li>
            <strong>Finished Basement:</strong>{" "}
            {property.features.finishedBasement ? "Yes" : "No"}
          </li>
          <li>
            <strong>Attic:</strong> {property.features.attic ? "Yes" : "No"}
          </li>
          <li>
            <strong>Air Conditioning:</strong>{" "}
            {property.features.airConditioning ? "Yes" : "No"}
          </li>
          <li>
            <strong>Remodeled:</strong>{" "}
            {property.features.remodeled ? "Yes" : "No"}
          </li>
          <li>
            <strong>Security System:</strong>{" "}
            {property.features.securitySystem ? "Yes" : "No"}
          </li>
          <li>
            <strong>Smart Home:</strong>{" "}
            {property.features.smartHome ? "Yes" : "No"}
          </li>
          <li>
            <strong>Fence:</strong> {property.features.fence ? "Yes" : "No"}
          </li>
          <li>
            <strong>HOA Fees:</strong> ${property.features.hoaFees}
          </li>
          <li>
            <strong>Pets Allowed:</strong>{" "}
            {property.features.petsAllowed ? "Yes" : "No"}
          </li>
          <li>
            <strong>Walk-In Closets:</strong>{" "}
            {property.features.walkInClosets ? "Yes" : "No"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyInfoComponent;
