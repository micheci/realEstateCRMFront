import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePropertyStore from "../store/propertyStore";

const PropertyEditPage = () => {
  const { propertyId } = useParams();
  const store = usePropertyStore();
  const { property, getPropertyById, loading, error } = store;

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    city: "",
    state: "",
    zip: "",
    images: [], // Existing images from backend
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]); // Track removed images

  useEffect(() => {
    getPropertyById(propertyId);
  }, [propertyId]);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        price: property.price || "",
        description: property.description || "",
        city: property.city || "",
        state: property.state || "",
        zip: property.zip || "",
        images: property.images || [], // Store existing image URLs
      });
    }
  }, [property]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleRemoveExistingImage = (imageUrl) => {
    setRemovedImages([...removedImages, imageUrl]); // Mark for deletion
    setFormData({
      ...formData,
      images: formData.images.filter((img) => img !== imageUrl),
    });
  };

  const handleRemoveNewImage = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("zip", formData.zip);

    // Append new image files
    selectedFiles.forEach((file) => {
      formDataToSend.append("images", file);
    });

    // Send removed images separately for deletion
    formDataToSend.append("removedImages", JSON.stringify(removedImages));

    try {
      // Replace with actual API call
      console.log("Submitting FormData:", formDataToSend);
      // Example: await fetch(`/api/properties/${propertyId}`, { method: "PUT", body: formDataToSend });
    } catch (error) {
      console.error("Error updating property:", error);
    }
  };

  if (loading) return <div>Loading property details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Location (City, State, Zip) */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">ZIP Code</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
        </div>

        {/* Existing Images */}
        <div>
          <label className="block font-medium">Existing Images</label>
          <div className="flex flex-wrap gap-2">
            {formData.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`Property Image ${index}`}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(img)}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium">Upload New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New Image ${index}`}
                  className="w-24 h-24 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PropertyEditPage;
