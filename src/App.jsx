import "./App.css";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import PropertyDetailPage from "./pages/propertyDetailPage";

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
        {/* New Route */}
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
