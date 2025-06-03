import React from "react";
import { Property } from "../../../interfaces/IProperty";

type StepAmenitiesProps = {
  data: Partial<Property>;
  setData: (data: Partial<Property>) => void;
};

const amenities = [
  "garage",
  "swimmingPool",
  "fireplace",
  "basement",
  "finishedBasement",
  "attic",
  "airConditioning",
  "remodeled",
  "outdoorSpace",
  "securitySystem",
  "smartHome",
  "fence",
  "petsAllowed",
  "walkInClosets",
  "isFeatured",
] as const;

const StepAmenities: React.FC<StepAmenitiesProps> = ({ data, setData }) => {
  const handleCheckbox = (field: (typeof amenities)[number]) => {
    setData({ ...data, [field]: !data[field] });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {amenities.map((amenity) => (
        <label key={amenity} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!data[amenity]}
            onChange={() => handleCheckbox(amenity)}
            className="accent-blue-600"
          />
          <span className="capitalize">
            {amenity.replace(/([A-Z])/g, " $1")}
          </span>
        </label>
      ))}

      <input
        type="number"
        placeholder="Parking Spaces"
        value={data.parkingSpaces?.toString() || ""}
        onChange={(e) =>
          setData({ ...data, parkingSpaces: parseInt(e.target.value) || 0 })
        }
        className="col-span-2 border rounded px-4 py-2"
      />

      <input
        type="number"
        placeholder="HOA Fees"
        value={data.hoaFees?.toString() || ""}
        onChange={(e) =>
          setData({ ...data, hoaFees: parseFloat(e.target.value) || 0 })
        }
        className="col-span-2 border rounded px-4 py-2"
      />
    </div>
  );
};

export default StepAmenities;
