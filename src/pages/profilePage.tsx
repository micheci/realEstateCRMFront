import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useProfileStore from "../store/profileStore";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchProfile, profile } = useProfileStore();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === "/myproperties";

  useEffect(() => {
    if (!profile) fetchProfile();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/myproperties")}
        >
          My Properties
        </h1>

        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          {!isHome && (
            <button
              onClick={() => navigate("/myproperties")}
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50"
            >
              Home
            </button>
          )}

          <button
            onClick={() => navigate("/add-property")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Add Property
          </button>

          {/* 👤 Profile Picture Button */}
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-400"
          >
            <img
              src={profile?.profilePicture || "/images/profile.jpg"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {/* 🔽 Dropdown */}
          {showDropdown && (
            <div className="absolute top-14 right-0 w-40 bg-white shadow-md rounded-md py-2 border z-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate("/profile");
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
