import { useState } from "react";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      socialMediaLinks: { ...profileData.socialMediaLinks, [name]: value },
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData({ ...profileData, profilePic: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log(profileData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={profileData.profilePic || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block font-semibold">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={profileData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block font-semibold">Email:</label>
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block font-semibold">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={profileData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block font-semibold">Agency Name:</label>
        <input
          type="text"
          name="agencyName"
          value={profileData.agencyName}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block font-semibold">Website:</label>
        <input
          type="url"
          name="website"
          value={profileData.website}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block font-semibold">License Number:</label>
        <input
          type="text"
          name="licenseNumber"
          value={profileData.licenseNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Social Media Links */}
        <h3 className="text-lg font-semibold mt-4">Social Media Links</h3>
        <label className="block">Facebook:</label>
        <input
          type="url"
          name="facebook"
          value={profileData.socialMediaLinks.facebook}
          onChange={handleSocialChange}
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block">Instagram:</label>
        <input
          type="url"
          name="instagram"
          value={profileData.socialMediaLinks.instagram}
          onChange={handleSocialChange}
          className="w-full p-2 border rounded mb-2"
        />

        <label className="block">LinkedIn:</label>
        <input
          type="url"
          name="linkedin"
          value={profileData.socialMediaLinks.linkedin}
          onChange={handleSocialChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Change Password */}
        <h3 className="text-lg font-semibold mt-4">Change Password</h3>
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Message Display */}
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default ProfilePage;
