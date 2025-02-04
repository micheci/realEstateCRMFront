import { useState } from "react";
import PropertiesHome from "./propertyHome";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Profile"); // Default menu item

  const renderContent = () => {
    switch (activeMenu) {
      case "Profile":
        return <div>Your Profile content goes here.</div>;
      case "Website Themes/Options":
        return <div>Customize your website themes and options here.</div>;
      case "Properties":
        return <PropertiesHome />;

      //return <PropertiesPage />;
      case "Log Out":
        return <div>You have logged out.</div>;
      default:
        return <div>Welcome to your dashboard!</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gray-800 text-white md:h-full h-16 md:static fixed bottom-0 w-full z-1">
        <div className="md:p-4 flex justify-around md:flex-col">
          {["Profile", "Website Themes/Options", "Properties", "Log Out"].map(
            (menu) => (
              <button
                key={menu}
                onClick={() => setActiveMenu(menu)}
                className={`${
                  activeMenu === menu ? "bg-gray-700" : ""
                } md:mb-4 text-sm md:text-base hover:bg-gray-700 p-2 rounded`}
              >
                {menu}
              </button>
            )
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-6 md:ml-0">
        <h1 className="text-2xl font-semibold mb-4">{activeMenu}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
