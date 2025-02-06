import "./App.css";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import PropertyDetailPage from "./pages/propertyDetailPage";
import PropertiesPage from "./pages/propertiesPage";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/properties/:propertyId"
          element={<PropertyDetailPage />}
        />{" "}
        <Route path="/properties/allProperties" element={<PropertiesPage />} />
        {/* New Route */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
