import React, { useState } from "react";

const propertyData = {
  id: "123",
  price: "$450,000",
  address: "123 Main St, Dallas, TX",
  bedrooms: 3,
  bathrooms: 2,
  sqft: "1,800 sqft",
  description:
    "A beautiful family home located in a quiet neighborhood. Features a spacious backyard and modern kitchen.",
  images: [
    "https://res.cloudinary.com/dvuqgmyxv/image/upload/v1737655453/nfdlqhw9odmp0xgd2avx.jpg",
    "https://res.cloudinary.com/dvuqgmyxv/image/upload/v1737655454/qaqfaytqxqdsvatlhshl.jpg",
  ],
  agentId: "789", // Reference to the agent

  garage: true,
  parkingSpaces: 2,
  swimmingPool: false,
  fireplace: true,
  basement: true,
  finishedBasement: false,
  attic: true,
  airConditioning: true,
  remodeled: false,
  securitySystem: true,
  smartHome: false,
  fence: true,
  hoaFees: 250,
  petsAllowed: true,
  walkInClosets: true,
};

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

const EditPropertyPage = () => {
  const [editedProperty, setEditedProperty] = useState<Property>(propertyData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image changes (allow the user to upload images)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setEditedProperty((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages], // Add new images to existing ones
      }));
    }
  };

  const handleSaveChanges = () => {
    console.log("Updated Property Data:", editedProperty);
  };

  const handleDeleteImage = (imageUrl: string) => {
    console.log(imageUrl, "imageurl to be deleted");
    setEditedProperty((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageUrl),
    }));
  };

  return (
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-3">Edit Property</h2>

      <label className="block mb-2">Address:</label>
      <input
        type="text"
        name="address"
        value={editedProperty.address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

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

      {/* Image Previews */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Property Images</h3>
        <div className="grid grid-cols-3 gap-4">
          {editedProperty.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Property image ${index + 1}`}
                className="w-full h-48 object-contain rounded"
              />
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteImage(image)}
                className="absolute top-1 right-1 text-white bg-red-500 hover:bg-red-600 rounded-full p-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload New Images */}
      <div className="mt-4">
        <label className="block">Upload New Images:</label>
        <input
          type="file"
          name="images"
          onChange={handleImageChange}
          accept="image/*"
          multiple
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Boolean fields */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Property Features</h3>
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
        ].map((feature) => (
          <label key={feature} className="block mt-2">
            <input
              type="checkbox"
              name={feature}
              checked={editedProperty[feature as keyof Property] as boolean}
              onChange={handleChange}
              className="mr-2"
            />
            {feature
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
        ))}
      </div>

      {/* Center the button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSaveChanges}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPropertyPage;
