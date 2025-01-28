import { useState, useEffect } from "react";
import { fetchProperties } from "../service/propertyService"; // Import the service

// Custom hook for managing property state and fetching data
const usePropertyStore = () => {
  const [properties, setProperties] = useState([]); // State to store properties
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data.data); // Store the fetched properties in state
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Handle any errors
        setLoading(false); // Set loading to false on error
      }
    };

    getProperties(); // Fetch properties when the component mounts
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return { properties, loading, error }; // Return the properties state, loading, and error states
};

export default usePropertyStore;
