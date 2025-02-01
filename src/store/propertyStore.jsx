import { useState } from "react";
import {
  fetchProperties,
  getPropertyByIdService,
} from "../service/propertyService";

// Custom hook for managing property state and fetching data
const usePropertyStore = () => {
  const [properties, setProperties] = useState([]); // State to store all properties
  const [property, setProperty] = useState(null); // State to store a single property
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

  return {
    properties,
    property,
    getAllProperties,
    getPropertyById,
    loading,
    error,
  };
};

export default usePropertyStore;
