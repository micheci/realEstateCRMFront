import { useState } from "react";
import PropertiesHome from "./propertyHome";
import ProfilePage from "./profilePage";
import WebSiteThemePage from "./webSiteThemePage";
import LogoutButton from "../components/logoutButtonComponent"; // Import your logout button

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Profile");

  const renderContent = () => {
    switch (activeMenu) {
      case "Profile":
        return <ProfilePage />;
      case "Website Themes/Options":
        return <WebSiteThemePage />;
      case "Properties":
        return <PropertiesHome />;
      default:
        return <div>Welcome to your dashboard!</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-64 bg-gray-800 text-white fixed md:top-0 md:left-0 md:h-screen w-full bottom-0 flex md:flex-col flex-row justify-around items-center p-2">
        {["Profile", "Website Themes/Options", "Properties"].map((menu) => (
          <button
            key={menu}
            onClick={() => setActiveMenu(menu)}
            className={`${
              activeMenu === menu ? "bg-gray-700" : ""
            } text-sm md:text-base hover:bg-gray-700 p-2 rounded`}
          >
            {menu}
          </button>
        ))}

        {/* Logout Button Component */}
        <LogoutButton />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 md:ml-64 h-screen overflow-y-auto pb-16 md:pb-0">
        <h1 className="text-2xl font-semibold mb-4">{activeMenu}</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
