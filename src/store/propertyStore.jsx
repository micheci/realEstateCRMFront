import { useState } from "react";
import {
  fetchProperties,
  getPropertyByIdService,
  editPropertyByIdService,
  createPropertyService,
  editPropertyImagesService,
} from "../service/propertyService";

// Custom hook for managing property state and fetching data
const usePropertyStore = () => {
  const [properties, setProperties] = useState([]); // State to store all properties
  const [property, setProperty] = useState < property > {}; // State to store a single property
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch all properties
  const getAllProperties = async () => {
    setLoading(true);
    try {
      const data = await fetchProperties();
      setProperties(data.data); // Store fetched properties
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to fetch a single property by ID
  const getPropertyById = async (propertyID) => {
    setLoading(true);
    try {
      const data = await getPropertyByIdService(propertyID);
      setProperty(data.data); // Store the single property

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to edit a property
  const editPropertyById = async (formData, propertyID) => {
    setLoading(true);
    try {
      await editPropertyByIdService(formData, propertyID);
      console.log("was updated");
      //setProperty(data.data); // Store the single property
      //setProperty(hardcodedProperty); // Store the single property

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to add a new property
  const createProperty = async (formData) => {
    setLoading(true);
    try {
      const data = await createPropertyService(formData);
      console.log(data, "was created");
      //setProperty(data.data); // Store the single property
      //setProperty(hardcodedProperty); // Store the single property

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  //fiunction to edit images/add to properties
  const editPropertyImages = async (formData, propertyID) => {
    setLoading(true);
    try {
      const data = await editPropertyImagesService(formData, propertyID);
      console.log("Images was updated");
      //setProperty(data.data); // Store the single property
      //setProperty(hardcodedProperty); // Store the single property

      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  return {
    properties,
    property,
    getAllProperties,
    getPropertyById,
    editPropertyById,
    createProperty,
    editPropertyImages,
    loading,
    error,
  };
};

export default usePropertyStore;
