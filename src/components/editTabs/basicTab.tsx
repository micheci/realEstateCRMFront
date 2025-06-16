import React from "react";

const BasicsTab = ({ editedProperty, handleChange }: any) => (
  <div className="space-y-4">
    {["title", "address", "price", "sqft"].map((field) => (
      <div key={field}>
        <label className="block mb-1 capitalize">{field}:</label>
        <input
          type="text"
          name={field}
          value={editedProperty[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    ))}
    {["bedrooms", "bathrooms"].map((field) => (
      <div key={field}>
        <label className="block mb-1 capitalize">{field}:</label>
        <input
          type="number"
          name={field}
          value={editedProperty[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
    ))}
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name="isFeatured"
        checked={editedProperty.isFeatured}
        onChange={handleChange}
      />
      <label>Featured Listing</label>
    </div>
  </div>
);

export default BasicsTab;
