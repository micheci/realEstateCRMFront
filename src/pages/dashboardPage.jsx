import { useState } from "react";
import PropertiesHome from "./propertyHome";
import ProfilePage from "./profilePage";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Profile"); // Default menu item

  const renderContent = () => {
    switch (activeMenu) {
      case "Profile":
        return <ProfilePage />;
      case "Website Themes/Options":
        return <div>Customize your website themes and options here.</div>;
      case "Properties":
        return <PropertiesHome />;
      case "Log Out":
        return <div>You have logged out.</div>;
      default:
        return <div>Welcome to your dashboard!</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-64 bg-gray-800 text-white fixed md:top-0 md:left-0 md:h-screen w-full bottom-0 flex md:flex-col flex-row justify-around items-center p-2">
        {["Profile", "Website Themes/Options", "Properties", "Log Out"].map(
          (menu) => (
            <button
              key={menu}
              onClick={() => setActiveMenu(menu)}
              className={`${
                activeMenu === menu ? "bg-gray-700" : ""
              } text-sm md:text-base hover:bg-gray-700 p-2 rounded`}
            >
              {menu}
            </button>
          )
        )}
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 bg-gray-100 p-6 md:ml-64 h-screen overflow-y-auto pb-16 md:pb-0">
        <h1 className="text-2xl font-semibold mb-4">{activeMenu}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
