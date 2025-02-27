import React, { useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import {
  profileState,
  fetchProfile,
  updateProfile,
} from "../store/profileStore";

const ProfileComponent = ({ userId }: { userId: string }) => {
  const profile = useHookstate(profileState);
  console.log(profile, "the prfile");
  // Fetch the profile data when the component mounts
  useEffect(() => {
    fetchProfile(userId); // Call the service to fetch the profile data
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in profile.socialMediaLinks) {
      profile.socialMediaLinks[name].set(value);
    } else {
      profile[name].set(value);
    }
  };

  const handleSaveChanges = async () => {
    const updatedProfile = {
      profilePic: profile.profilePic.get(),
      fullName: profile.fullName.get(),
      email: profile.email.get(),
      phone: profile.phone.get(),
      agencyName: profile.agencyName.get(),
      website: profile.website.get(),
      licenseNumber: profile.licenseNumber.get(),
      socialMediaLinks: {
        facebook: profile.socialMediaLinks.facebook.get(),
        instagram: profile.socialMediaLinks.instagram.get(),
        linkedin: profile.socialMediaLinks.linkedin.get(),
      },
      password: profile.password.get(),
    };

    await updateProfile(userId, updatedProfile); // Call the service to update the profile on the backend
  };

  return (
    <div>
      <h1>Profile</h1>
      <form>
        <div>
          <label>Profile Picture URL</label>
          <input
            type="text"
            name="profilePic"
            value={profile.profilePic.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Agency Name</label>
          <input
            type="text"
            name="agencyName"
            value={profile.agencyName.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={profile.website.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={profile.licenseNumber.get()}
            onChange={handleChange}
          />
        </div>
        <h2>Social Media Links</h2>
        <div>
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            value={profile.socialMediaLinks.facebook.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instagram</label>
          <input
            type="text"
            name="instagram"
            value={profile.socialMediaLinks.instagram.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={profile.socialMediaLinks.linkedin.get()}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={profile.password.get()}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileComponent;
