import axios from "axios";

const API_URL = "http://localhost:5000/api/profile"; // Replace with your actual API endpoint

// Fetch profile data from the backend
export const getProfileData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data; // Return the profile data
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

// Update profile data in the backend
export const updateProfileData = async (
  userId: string,
  updatedProfile: Partial<any>
) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, updatedProfile);
    return response.data; // Return the updated profile data
  } catch (error) {
    console.error("Error updating profile data:", error);
    throw error;
  }
};
