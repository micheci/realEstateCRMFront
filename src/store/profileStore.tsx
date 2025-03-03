import { hookstate } from "@hookstate/core";
import {
  getProfileData,
  updateProfileData,
  uploadProfilePicture,
} from "../service/profileService";

// Define the profile state structure
type Profile = {
  profilePicture: string;
  fullName: string;
  email: string;
  phone: string;
  agencyName: string;
  website: string;
  licenseNumber: string;

  facebook: string;
  instagram: string;
  linkedin: string;
  password: string;
};

// Initialize the profile state with default values
const profileState = hookstate<Profile>({
  profilePicture: "",
  fullName: "",
  email: "",
  phone: "",
  agencyName: "",
  website: "",
  licenseNumber: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  password: "",
});

// Fetch profile data from the backend and update the state
const fetchProfile = async () => {
  try {
    const profileData = await getProfileData(); // Call service to fetch data
    profileState.set(profileData); // Set the state with the fetched profile data
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
};

// Update profile data in the backend and update the state after success
const updateProfile = async (newProfile: Partial<Profile>) => {
  try {
    const updatedProfile = await updateProfileData(newProfile); // Call service to update data
    profileState.set(updatedProfile); // Update the state with the updated profile data
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Upload a profile pic
const uploadProfilePic = async (imageData: FormData) => {
  try {
    // Upload the profile picture
    const updatedProfile = await uploadProfilePicture(imageData);
    console.log(updatedProfile, "hi");
    // Update the profileState with the new profile picture URL
    profileState.set({
      ...profileState.get(), // Keep other profile data intact
      profilePicture: updatedProfile.imageUrl, // Update the profilePic field
    });
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

// Export everything at the bottom
export { profileState, fetchProfile, updateProfile, uploadProfilePic };
