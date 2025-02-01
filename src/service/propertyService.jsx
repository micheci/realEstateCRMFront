import axios from "axios";

const API_URL = "http://localhost:5000/api/property"; // Replace with your backend API URL

// Service to fetch properties using Axios and Auth Token
export const fetchProperties = async () => {
  try {
    // Retrieve the auth token (e.g., from localStorage, sessionStorage, or state management)
    const token = localStorage.getItem("authToken"); // Replace with how you store your token

    // Make the GET request with the token included in the Authorization header
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token as a Bearer token
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    // Handle and throw errors
    throw new Error(
      error.response?.data?.message || "Failed to fetch properties"
    );
  }
};
//get details for one property
export const getPropertyByIdService = async (propertyID) => {
  try {
    // Retrieve the auth token (e.g., from localStorage, sessionStorage, or state management)
    const token = localStorage.getItem("authToken"); // Replace with how you store your token

    // Make the GET request with the token included in the Authorization header
    const response = await axios.get(API_URL + `/${propertyID}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token as a Bearer token
      },
    });
    console.log(response.data, "getting ONE property inservice");
    return response.data; // Return the response data
  } catch (error) {
    // Handle and throw errors
    throw new Error(
      error.response?.data?.message || "Failed to fetch properties"
    );
  }
};
