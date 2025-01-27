import { useState } from "react";
import Sidebar from "./Sidebar";
import PropertiesPage from "../pages/propertiesPage";
function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("properties");

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar (only visible on larger screens) */}
      <Sidebar setSelectedPage={setSelectedPage} />

      {/* Main content area */}
      <div className="flex-1 p-4 overflow-auto">
        {selectedPage === "properties" && <PropertiesPage />}
        {/* {selectedPage === "profile" && <ProfilePage />}
        {selectedPage === "settings" && <SettingsPage />}
        {selectedPage === "themes" && <ThemesPage />} */}
      </div>

      {/* Mobile Bottom Navigation (visible on small screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between">
        <button onClick={() => setSelectedPage("properties")}>
          Properties
        </button>
        {/* <button onClick={() => setSelectedPage("profile")}>Profile</button>
        <button onClick={() => setSelectedPage("settings")}>Settings</button>
        <button onClick={() => setSelectedPage("themes")}>Themes</button> */}
      </div>
    </div>
  );
}

export default Dashboard;
