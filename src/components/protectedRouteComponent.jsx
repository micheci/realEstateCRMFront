import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteComponent = () => {
  const authToken = localStorage.getItem("authToken"); // Check if user is authenticated

  return authToken ? <Outlet /> : <Navigate to="/" replace />; // Redirect to login if not
};

export default ProtectedRouteComponent;
