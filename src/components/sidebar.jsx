import { Link } from "react-router-dom"; // for navigation
import { useState } from "react";

function Sidebar({ setSelectedPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Properties", id: "properties" },
    { name: "Profile", id: "profile" },
    { name: "Settings", id: "settings" },
    { name: "Themes", id: "themes" },
  ];

  return (
    <div
      className={`bg-gray-800 text-white w-full md:w-1/4 p-4 ${
        isOpen ? "block" : "hidden"
      } md:block`} // Show on large screens by default, hidden on mobile
    >
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white p-2"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id} className="mb-4">
            <Link
              to="#"
              className="block px-4 py-2 rounded-md hover:bg-gray-700"
              onClick={() => setSelectedPage(item.id)} // Update selected page
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
