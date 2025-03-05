import React, { useEffect, useState } from "react";
import UploadImagesComponent from "../components/uploadImagesComponent";
import usePropertyStore from "../store/propertyStore";
import { useParams } from "react-router-dom";

// interface Property {
//   _id: string;
//   price: string;
//   address: string;
//   bedrooms: number;
//   bathrooms: number;
//   sqft: string;
//   description: string;
//   images: string[];
//   agentId: string;

//   garage: boolean;
//   parkingSpaces: number;
//   swimmingPool: boolean;
//   fireplace: boolean;
//   basement: boolean;
//   finishedBasement: boolean;
//   attic: boolean;
//   airConditioning: boolean;
//   remodeled: boolean;
//   securitySystem: boolean;
//   smartHome: boolean;
//   fence: boolean;
//   hoaFees: number;
//   petsAllowed: boolean;
//   walkInClosets: boolean;
// }

const EditPropertyPage = () => {
  // will need to make call to api to get all the information from the backend for property
  const { editPropertyById, getPropertyById, property } = usePropertyStore();
  const [editedProperty, setEditedProperty] = useState<any>(property);
  const [images, setImages] = useState(editedProperty.images);
  console.log(editedProperty, "THESTATESHOULDBEREAL");
  const { propertyId } = useParams();

  useEffect(() => {
    if (propertyId) {
      getPropertyById(propertyId);
    }
  }, [propertyId]);

  // Update editedProperty when property data is fetched
  useEffect(() => {
    if (property) {
      setEditedProperty(property);
      //setImages(property.images || []); // Ensure images is an array
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedProperty((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormUpdate = () => {
    console.log("Updated Property Data:", editedProperty);
    editPropertyById(editedProperty, editedProperty.id);
  };

  return (
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-3">Edit Property</h2>
      {/* <UploadImagesComponent images={images} setImages={setImages} />{" "} */}
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
      {/* Boolean fields */}
      {/* <div className="mt-6">
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
      </div> */}
      {/* Center the button */}
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
