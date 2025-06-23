import React from "react";
import { Property } from "../../../interfaces/IProperty";

type StepBasicsProps = {
  data: Partial<Property>;
  setData: (data: Partial<Property>) => void;
};

const StepBasics: React.FC<StepBasicsProps> = ({ data, setData }) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={data.title || ""}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        className="w-full border rounded px-4 py-2"
      />

      <input
        type="text"
        placeholder="Address"
        value={data.address || ""}
        onChange={(e) => setData({ ...data, address: e.target.value })}
        className="w-full border rounded px-4 py-2"
      />

      <input
        type="text"
        placeholder="Price"
        value={data.price?.toString() || ""}
        onChange={(e) =>
          setData({ ...data, price: parseFloat(e.target.value) || 0 })
        }
        className="w-full border rounded px-4 py-2"
      />

      <input
        type="number"
        placeholder="Bedrooms"
        value={data.bedrooms?.toString() || ""}
        onChange={(e) =>
          setData({ ...data, bedrooms: parseInt(e.target.value) || 0 })
        }
        className="w-full border rounded px-4 py-2"
      />

      <input
        type="number"
        placeholder="Bathrooms"
        value={data.bathrooms?.toString() || ""}
        onChange={(e) =>
          setData({ ...data, bathrooms: parseInt(e.target.value) || 0 })
        }
        className="w-full border rounded px-4 py-2"
      />

      <input
        type="number"
        placeholder="Square Footage"
        value={data.sqft?.toString() || ""}
        onChange={(e) =>
          setData({ ...data, sqft: parseInt(e.target.value) || 0 })
        }
        className="w-full border rounded px-4 py-2"
      />

      <select
        value={data.type || ""}
        onChange={(e) => setData({ ...data, type: e.target.value })}
        className="w-full border rounded px-4 py-2"
        required
      >
        <option value="" disabled hidden>
          Select Property Type
        </option>
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Condo">Condo</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Land">Land</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={data.status || ""}
        onChange={(e) => setData({ ...data, status: e.target.value })}
        className="w-full border rounded px-4 py-2"
        required
      >
        <option value="" disabled hidden>
          Select Listing Status
        </option>
        <option value="Active">Active</option>
        <option value="Sold">Sold</option>
        <option value="Draft">Draft</option>
      </select>
    </div>
  );
};

export default StepBasics;
