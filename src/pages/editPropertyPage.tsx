import React, { useEffect, useState } from "react";
import UploadImagesComponent from "../components/uploadImagesComponent";
import usePropertyStore from "../store/propertyStore";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditPropertyPage = () => {
  const { editPropertyById, getPropertyById, property } = usePropertyStore();
  const [editedProperty, setEditedProperty] = useState<any>(property);
  const [images, setImages] = useState<any>(editedProperty.images || []);
  const { propertyId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (propertyId) {
      getPropertyById(propertyId);
    }
  }, [propertyId]);

  useEffect(() => {
    if (property) {
      setEditedProperty(property);
      setImages(property.images || []);
    }
  }, [property]);

  useEffect(() => {
    setEditedProperty((prev) => ({
      ...prev,
      images: images,
    }));
  }, [images]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormUpdate = async () => {
    try {
      await editPropertyById(editedProperty, editedProperty._id);
      toast.success("Changes saved successfully!");
    } catch (err) {
      toast.error("Failed to save changes.");
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">Edit Property</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ← Back to Dashboard
        </button>
      </div>
      <label className="block mb-2">Title:</label>
      <input
        type="text"
        name="title"
        value={editedProperty.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <label className="block mb-2">Address:</label>
      <input
        type="text"
        name="address"
        value={editedProperty.address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          name="isFeatured"
          checked={editedProperty.isFeatured || false}
          onChange={handleChange}
          id="isFeatured"
        />
        <label htmlFor="isFeatured">Featured Listing</label>
        <h1>*This will be shown on the home page(can only have up to 6)</h1>
      </div>
      <label className="block mt-4">Price:</label>
      <input
        type="text"
        name="price"
        value={editedProperty.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="block mt-4">Bedrooms:</label>
      <input
        type="number"
        name="bedrooms"
        value={editedProperty.bedrooms}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="block mt-4">Bathrooms:</label>
      <input
        type="number"
        name="bathrooms"
        value={editedProperty.bathrooms}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="block mt-4">Size (sqft):</label>
      <input
        type="text"
        name="sqft"
        value={editedProperty.sqft}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="block mt-4">Description:</label>
      <textarea
        name="description"
        value={editedProperty.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      ></textarea>

      {/* Horizontal checkboxes below */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mt-4">
        {[
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
        ].map((field) => (
          <div className="flex items-center gap-2" key={field}>
            <input
              type="checkbox"
              name={field}
              checked={editedProperty[field] || false}
              onChange={handleChange}
              id={field}
            />
            <label htmlFor={field} className="capitalize">
              {field.replace(/([A-Z])/g, " $1")}
            </label>
          </div>
        ))}
      </div>

      <label className="block mt-4">Parking Spaces:</label>
      <input
        type="number"
        name="parkingSpaces"
        value={editedProperty.parkingSpaces || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="block mt-4">HOA Fees:</label>
      <input
        type="number"
        name="hoaFees"
        value={editedProperty.hoaFees || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Upload Images */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Images:</h3>
        <UploadImagesComponent images={images} setImages={setImages} />
      </div>

      {/* Submit */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleFormUpdate}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPropertyPage;
