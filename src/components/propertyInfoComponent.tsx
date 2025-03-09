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
}

const PropertyInfoComponent = ({ property }: { property: Property }) => {
  const encodedAddress = encodeURIComponent(property.address);

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
        <h3 className="text-lg font-semibold text-center mb-4">
          Property Features
        </h3>

        {/* Inside Features */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800">Inside</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              <strong>Air Conditioning:</strong>{" "}
              {property.airConditioning ? "Yes" : "No"}
            </li>
            <li>
              <strong>Remodeled:</strong> {property.remodeled ? "Yes" : "No"}
            </li>
            <li>
              <strong>Fireplace:</strong> {property.fireplace ? "Yes" : "No"}
            </li>
            <li>
              <strong>Basement:</strong> {property.basement ? "Yes" : "No"}
            </li>
            <li>
              <strong>Finished Basement:</strong>{" "}
              {property.finishedBasement ? "Yes" : "No"}
            </li>
            <li>
              <strong>Attic:</strong> {property.attic ? "Yes" : "No"}
            </li>
            <li>
              <strong>Walk-In Closets:</strong>{" "}
              {property.walkInClosets ? "Yes" : "No"}
            </li>
          </ul>
        </div>

        {/* Outside Features */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800">Outside</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              <strong>Garage:</strong> {property.garage ? "Yes" : "No"}
            </li>
            <li>
              <strong>Swimming Pool:</strong>{" "}
              {property.swimmingPool ? "Yes" : "No"}
            </li>
            <li>
              <strong>Fence:</strong> {property.fence ? "Yes" : "No"}
            </li>
            <li>
              <strong>Parking Spaces:</strong> {property.parkingSpaces}
            </li>
          </ul>
        </div>

        {/* Neighborhood Features */}
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800">Neighborhood</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              <strong>Pets Allowed:</strong>{" "}
              {property.petsAllowed ? "Yes" : "No"}
            </li>
            <li>
              <strong>HOA Fees:</strong> ${property.hoaFees}
            </li>
            <li>
              <strong>Security System:</strong>{" "}
              {property.securitySystem ? "Yes" : "No"}
            </li>
            <li>
              <strong>Smart Home:</strong> {property.smartHome ? "Yes" : "No"}
            </li>
          </ul>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-center mb-4">Location</h3>
        {/* Hide the map on mobile and tablet screens */}
        <div className="hidden lg:block">
          <iframe
            width="600"
            height="450"
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBejTSPgVWVGTKYGD4Kqq-inCFkcSfcGUs&q=${encodedAddress}`}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfoComponent;
