import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePropertyStore from "../store/propertyStore";

const PropertyEditPage = () => {
  const { propertyId } = useParams();
  const store = usePropertyStore();
  const { property, getPropertyById, loading, error } = store;

  const [formData, setFormData] = useState({
    // Basic Details
    title: "",
    price: "",
    description: "",
    city: "",
    state: "",
    zip: "",
    images: [], // Existing images from backend

    // Property Features
    features: {
      yearBuilt: "", // Year the property was built
      remodeled: false, // Whether the property has been remodeled
      flooringType: "", // Flooring material
      ceilingHeight: "", // Ceiling height in feet
      attic: false, // Whether there's an attic
      basement: false, // Whether there's a basement
      finishedBasement: false, // Whether the basement is finished

      // Lot & Exterior

      fence: false, // Whether there's a fence
      outdoorSpace: "", // Description of outdoor spaces

      // Parking & Garage
      garage: false, // Garage presence

      // Utilities & Energy Efficiency
      airConditioning: false, // Whether the property has air conditioning

      // Amenities & Features
      swimmingPool: false, // Whether there's a swimming pool
      fireplace: false, // Whether the property has a fireplace
      securitySystem: false, // Whether the property has a security system
      smartHome: false, // Whether the property has smart home features
      walkInClosets: false, // Whether there are walk-in closets

      // Community & HOA
      communityAmenities: [], // Community amenities
      hoaFees: "", // HOA fees if applicable
      petsAllowed: false, // Whether pets are allowed

      // Accessibility
      accessibilityFeatures: [], // Accessibility features

      // Financial & Listing Details

      floodZone: false, // Whether the property is in a flood zone
    },
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
        features: {
          garage: property.features?.garage || false,
          parkingSpaces: property.features?.parkingSpaces || "",
          swimmingPool: property.features?.swimmingPool || false,
          fireplace: property.features?.fireplace || false,
          basement: property.features?.basement || false,
          finishedBasement: property.features?.finishedBasement || false,
          attic: property.features?.attic || false,
          airConditioning: property.features?.airConditioning || false,

          remodeled: property.features?.remodeled || false,

          appliancesIncluded: property.features?.appliancesIncluded || [],

          outdoorSpace: property.features?.outdoorSpace || "",
          securitySystem: property.features?.securitySystem || false,
          smartHome: property.features?.smartHome || false,
          fence: property.features?.fence || false,

          hoaFees: property.features?.hoaFees || "",
          petsAllowed: property.features?.petsAllowed || false,
          walkInClosets: property.features?.walkInClosets || false,
        },
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        features: {
          ...formData.features,
          [name]: checked,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    formDataToSend.append("title", "TEST");
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("zip", formData.zip);
    formDataToSend.append("bedrooms", formData.bedrooms);
    formDataToSend.append("bathrooms", formData.bathrooms);
    formDataToSend.append("area", formData.area);
    formDataToSend.append("features", JSON.stringify(formData.features));

    // 🔹 Check if selectedFiles contains images
    console.log(selectedFiles, "selected files before appending");

    if (selectedFiles.length === 0) {
      console.warn("⚠️ No images selected!");
    }

    // Append new image files
    selectedFiles.forEach((file) => {
      console.log(
        `Appending image: ${file.name}, type: ${file.type}, size: ${file.size} bytes`
      );
      formDataToSend.append("images", file);
    });

    // Append removed images
    formDataToSend.append("removedImages", JSON.stringify(removedImages));

    // 🔹 Log FormData contents
    console.log("FormData entries:");
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      // Replace with actual API call
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

        {/* Bedrooms and Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
        </div>

        {/* Area */}
        <div>
          <label className="block font-medium">Area (sq ft)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        {/*Year build  */}
        <div>
          <label className="block font-medium">Year Build</label>
          <input
            type="text"
            name="title"
            value={formData.features.yearBuilt}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        {/*Garage capacity  */}
        <div>
          <label className="block font-medium">Garage capacity</label>
          <input
            type="text"
            name="title"
            value={formData.features.garageCapacity}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Features (Checkboxes) */}
        <div>
          <label className="block font-medium">Features</label>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData.features).map((feature) => (
              <div key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  name={feature}
                  checked={formData.features[feature]}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>
                  {feature.charAt(0).toUpperCase() + feature.slice(1)}
                </label>
              </div>
            ))}
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

          {/* Styled Upload Box */}
          <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-md cursor-pointer hover:bg-gray-100">
            <span className="text-gray-600">
              Click to upload or drag & drop images
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Preview Selected Images */}
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
