import { useState } from "react";
import {
  getProfileData,
  updateProfileData,
  uploadProfilePicture,
} from "../service/profileService";

// Define the Profile interface
interface Profile {
  // _id: string;
  fullName: string;
  email: string;
  phone: string;
  agencyName: string;
  website: string;
  licenseNumber: string;
  profilePicture?: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  // isActive: boolean;
  // createdAt: string;
  // updatedAt: string;
}

// Define the return type for the hook
interface ProfileStore {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (newProfile: Profile) => Promise<void>;
  uploadProfilePic: (imageData: File) => Promise<void>;
}

// Custom hook for managing profile state
const useProfileStore = (): ProfileStore => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch profile data
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const profileData: Profile = await getProfileData();
      setProfile(profileData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Function to update profile data
  const updateProfile = async (newProfile: Profile) => {
    setLoading(true);
    try {
      const updatedProfile: Profile = await updateProfileData(newProfile);
      setProfile(updatedProfile);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Function to upload a new profile picture
  const uploadProfilePic = async (imageData: any) => {
    setLoading(true);
    try {
      const updatedProfile = await uploadProfilePicture(imageData);
      setProfile((prevProfile) =>
        prevProfile
          ? { ...prevProfile, profilePicture: updatedProfile.imageUrl }
          : null
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    fetchProfile,
    updateProfile,
    uploadProfilePic,
    loading,
    error,
  };
};

export default useProfileStore;
