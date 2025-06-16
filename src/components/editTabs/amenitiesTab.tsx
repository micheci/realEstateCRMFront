import React from "react";
import { Property } from "../../../interfaces/IProperty";

interface AmenitiesTabProps {
  editedProperty: Property;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const fields = [
  "garage",
  "swimmingPool",
  "fireplace",
  "basement",
  "finishedBasement",
  "attic",
  "airConditioning",
  "remodeled",
  "securitySystem",
  "smartHome",
  "fence",
  "petsAllowed",
  "walkInClosets",
  "outdoorSpace",
] as const;

const AmenitiesTab: React.FC<AmenitiesTabProps> = ({
  editedProperty,
  handleChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field) => (
          <label
            key={field}
            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <input
              type="checkbox"
              name={field}
              checked={Boolean(editedProperty[field])}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="capitalize text-gray-700">
              {field.replace(/([A-Z])/g, " $1").trim()}
            </span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parking Spaces
          </label>
          <input
            type="number"
            name="parkingSpaces"
            value={editedProperty.parkingSpaces || ""}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HOA Fees ($)
          </label>
          <input
            type="number"
            name="hoaFees"
            value={editedProperty.hoaFees || ""}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
};

export default AmenitiesTab;
