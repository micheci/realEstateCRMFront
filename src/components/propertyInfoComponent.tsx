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

  const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const renderFeatures = (
    title: string,
    features: { label: string; value: string | number }[]
  ) => (
    <div className="mt-8">
      <h4 className="font-semibold text-gray-800 text-lg mb-4">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex flex-col items-center justify-between shadow-sm bg-white"
          >
            <span className="text-sm text-gray-500 font-medium mb-2 text-center">
              {feature.label}
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {feature.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

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

        {renderFeatures("Inside Features", [
          {
            label: "Air Conditioning",
            value: property.airConditioning ? "Yes" : "No",
          },
          { label: "Remodeled", value: property.remodeled ? "Yes" : "No" },
          { label: "Fireplace", value: property.fireplace ? "Yes" : "No" },
          { label: "Basement", value: property.basement ? "Yes" : "No" },
          {
            label: "Finished Basement",
            value: property.finishedBasement ? "Yes" : "No",
          },
          { label: "Attic", value: property.attic ? "Yes" : "No" },
          {
            label: "Walk-In Closets",
            value: property.walkInClosets ? "Yes" : "No",
          },
          {
            label: "Sqft",
            value: property.sqft?.toLocaleString() || "N/A",
          },
        ])}

        {renderFeatures("Outside Features", [
          { label: "Garage", value: property.garage ? "Yes" : "No" },
          {
            label: "Swimming Pool",
            value: property.swimmingPool ? "Yes" : "No",
          },
          { label: "Fence", value: property.fence ? "Yes" : "No" },
          { label: "Parking Spaces", value: property.parkingSpaces },
        ])}

        {renderFeatures("Neighborhood Features", [
          { label: "Pets Allowed", value: property.petsAllowed ? "Yes" : "No" },
          { label: "HOA Fees", value: `$${property.hoaFees}` },
          {
            label: "Security System",
            value: property.securitySystem ? "Yes" : "No",
          },
          { label: "Smart Home", value: property.smartHome ? "Yes" : "No" },
        ])}
      </div>

      {/* Map Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-center mb-4">Location</h3>
        <div className="hidden lg:flex justify-center">
          <iframe
            width="600"
            height="450"
            loading="lazy"
            src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_KEY}&q=${encodedAddress}`}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfoComponent;
