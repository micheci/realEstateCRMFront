import "./App.css";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import PropertyDetailPage from "./pages/propertyDetailPage";
import PropertiesPage from "./pages/propertiesPage";
import "leaflet/dist/leaflet.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRouteComponent from "./components/protectedRouteComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRouteComponent />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/properties/:propertyId"
            element={<PropertyDetailPage />}
          />{" "}
          <Route
            path="/properties/allProperties"
            element={<PropertiesPage />}
          />
          {/* New Route */}
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
