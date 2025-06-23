import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePropertyStore from "../store/propertyStore";
import toast from "react-hot-toast";
import BasicsTab from "../components/editTabs/basicTab";
import AmenitiesTab from "../components/editTabs/amenitiesTab";
import MediaTab from "../components/editTabs/mediaTab";
import DescriptionTab from "../components/editTabs/descriptionTab";
import { Property } from "../../interfaces/IProperty";
const TABS = ["Basics", "Amenities", "Media", "Description"];

const EditPropertyPage = () => {
  const { editPropertyById, getPropertyById, property } = usePropertyStore();
  const [editedProperty, setEditedProperty] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("Basics");
  const { propertyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (propertyId) getPropertyById(propertyId);
  }, [propertyId]);

  useEffect(() => {
    if (property) {
      setEditedProperty(property);
      setImages(property.images || []);
    }
  }, [property]);

  useEffect(() => {
    setEditedProperty((prev) => (prev ? { ...prev, images } : null));
  }, [images]);

  const handleFormUpdate = async () => {
    if (!editedProperty) return;

    try {
      await editPropertyById(editedProperty, editedProperty._id);
      toast.success("Changes saved successfully!");
    } catch (err) {
      toast.error("Failed to save changes.");
      console.error(err);
    }
  };

  const renderTabContent = () => {
    if (!editedProperty) return null;

    switch (activeTab) {
      case "Basics":
        return (
          <BasicsTab
            editedProperty={editedProperty}
            setEditedProperty={setEditedProperty}
          />
        );
      case "Amenities":
        return (
          <AmenitiesTab
            editedProperty={editedProperty}
            setEditedProperty={setEditedProperty}
          />
        );
      case "Media":
        return <MediaTab images={images} setImages={setImages} />;
      case "Description":
        return (
          <DescriptionTab
            editedProperty={editedProperty}
            setEditedProperty={setEditedProperty}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white p-6 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Edit Property</h2>
        <button
          onClick={() => navigate("/myproperties")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ← Back
        </button>
      </div>

      <div className="flex space-x-4 border-b mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-3 border-b-2 font-medium ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderTabContent()}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleFormUpdate}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPropertyPage;
