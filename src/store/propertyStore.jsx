import { useState } from "react";
import {
  fetchProperties,
  getPropertyByIdService,
} from "../service/propertyService";
const hardcodedProperty = {
  id: "1",
  title: "Modern Apartment in Downtown",
  price: "350000",
  description:
    "A beautiful 2-bedroom apartment in the heart of downtown. Perfect for urban living with stunning city views.",
  city: "New York",
  state: "NY",
  zip: "10001",
  images: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150?text=Image+2",
    "https://via.placeholder.com/150?text=Image+3",
  ],
  features: {
    garage: true, // Garage presence

    swimmingPool: false, // Whether there's a swimming pool
    fireplace: true, // Whether the property has a fireplace
    basement: false, // Whether there's a basement
    finishedBasement: false, // Whether the basement is finished
    attic: true, // Whether there's an attic
    airConditioning: true, // Whether the property has air conditioning

    yearBuilt: 2015, // Year the property was built
    remodeled: true, // Whether the property has been remodeled

    appliancesIncluded: ["Refrigerator", "Dishwasher", "Washer/Dryer"], // List of included appliances
    energyEfficiency: ["Solar Panels", "Insulated Windows"], // Energy efficiency features
    securitySystem: true, // Whether the property has a security system
    smartHome: true, // Whether the property has smart home features
    fence: true, // Whether there's a fence
    accessibilityFeatures: ["Wheelchair Ramp"], // Accessibility features
    hoaFees: 300, // HOA fees if applicable
    petsAllowed: true, // Whether pets are allowed

    walkInClosets: true, // Whether there are walk-in closets
    communityAmenities: ["Clubhouse", "Fitness Center", "Tennis Courts"], // Community amenities
  },
};

// Custom hook for managing property state and fetching data
const usePropertyStore = () => {
  const [properties, setProperties] = useState([]); // State to store all properties
  const [property, setProperty] = useState(false); // State to store a single property
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
      //const data = await getPropertyByIdService(propertyID);
      //setProperty(data.data); // Store the single property
      setProperty(hardcodedProperty); // Store the single property

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
