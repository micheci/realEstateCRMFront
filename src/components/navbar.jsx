import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          My Properties
        </h1>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/add-property")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Add Property
          </button>

          {/* Profile Button */}
          <button className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-400">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
