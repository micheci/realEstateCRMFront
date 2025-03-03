import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/profile"; // Replace with your actual API endpoint

// Fetch profile data from the backend
export const getProfileData = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Replace with how you store your token

    // Make the GET request with the token included in the Authorization header
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token as a Bearer token
      },
    });
    return response.data; // Return the profile data
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error;
  }
};

// Update profile data in the backend
export const updateProfileData = async (updatedProfile: Partial<any>) => {
  try {
    const token = localStorage.getItem("authToken"); // Replace with how you store your token

    console.log("Sending to backend:", updatedProfile);

    // Make the PUT request with the body and headers
    const response = await axios.put(API_URL, updatedProfile, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token as a Bearer token
        "Content-Type": "application/json", // Ensure JSON format
      },
    });

    return response.data; // Return the updated profile data
  } catch (error) {
    console.error("Error updating profile data:", error);
    throw error;
  }
};

export const uploadProfilePicture = async (profilePic: FormData) => {
  try {
    const token = localStorage.getItem("authToken"); // Replace with how you store your token

    console.log("Sending to backend:", profilePic);

    // Make the PUT request with the body and headers
    const response = await axios.post(
      API_URL + "/upload-profile-picture",
      profilePic,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token as a Bearer token
        },
      }
    );

    return response.data; // Return the updated profile data
  } catch (error) {
    console.error("Error updating profile data:", error);
    throw error;
  }
};
