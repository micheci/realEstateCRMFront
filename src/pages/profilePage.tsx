import React, { useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";
import {
  profileState,
  fetchProfile,
  updateProfile,
  uploadProfilePic,
} from "../store/profileStore";

const ProfileComponent = () => {
  const profile = useHookstate(profileState);
  console.log(profile, "thePROFILE");

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    profile[name]?.set(value); // Using optional chaining
  };

  const handleSaveChanges = async () => {
    const updatedProfile = {
      profilePicture: profile.profilePicture.get(),
      fullName: profile.fullName.get(),
      email: profile.email.get(),
      phone: profile.phone.get(),
      agencyName: profile.agencyName.get(),
      website: profile.website.get(),
      licenseNumber: profile.licenseNumber.get(),
      facebook: profile.facebook.get(),
      instagram: profile.instagram.get(),
      linkedin: profile.linkedin.get(),
      password: profile.password.get(),
    };

    await updateProfile(updatedProfile);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle file change event and store the file in the state
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Store the selected file
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile) {
      const imageData = new FormData();
      imageData.append("profilePicture", selectedFile);

      for (const pair of imageData.entries()) {
        console.log(pair[0], pair[1]); // Logs: profilePicture, [object File]
      }

      await uploadProfilePic(imageData); // Call backend API to upload the image
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
        <form className="space-y-4">
          <div className="flex flex-col items-center">
            <label className="block font-semibold mb-1 text-center">
              This is how the profile picture will look
            </label>
            <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-2 border-gray-300">
              <img
                src={profileState.profilePicture.get()}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-lg p-2"
            />
            <button
              type="button"
              onClick={handleUploadClick}
              className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Update Profile Picture
            </button>
          </div>
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Agency Name</label>
            <input
              type="text"
              name="agencyName"
              value={profile.agencyName.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Website</label>
            <input
              type="text"
              name="website"
              value={profile.website.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={profile.licenseNumber.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <h2 className="text-xl font-semibold mt-4">Social Media Links</h2>
          <div>
            <label className="block font-semibold mb-1">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={profile.facebook.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={profile.instagram.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={profile.linkedin.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={profile.password.get()}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <button
            type="button"
            onClick={handleSaveChanges}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;
