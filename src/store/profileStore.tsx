import { hookstate } from "@hookstate/core";
import { getProfileData, updateProfileData } from "../service/profileService";

// Define the profile state structure
type Profile = {
  profilePic: string;
  fullName: string;
  email: string;
  phone: string;
  agencyName: string;
  website: string;
  licenseNumber: string;
  socialMediaLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  password: string;
};

// Initialize the profile state with default values
const profileState = hookstate<Profile>({
  profilePic: "",
  fullName: "John Doe",
  email: "johndoe@example.com",
  phone: "",
  agencyName: "",
  website: "",
  licenseNumber: "",
  socialMediaLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  password: "",
});

// Fetch profile data from the backend and update the state
const fetchProfile = async (userId: string) => {
  try {
    const profileData = await getProfileData(userId); // Call service to fetch data
    profileState.set(profileData); // Set the state with the fetched profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

// Update profile data in the backend and update the state after success
const updateProfile = async (userId: string, newProfile: Partial<Profile>) => {
  try {
    const updatedProfile = await updateProfileData(userId, newProfile); // Call service to update data
    profileState.set(updatedProfile); // Update the state with the updated profile data
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Export everything at the bottom
export { profileState, fetchProfile, updateProfile };
