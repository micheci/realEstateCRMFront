import { useNavigate } from "react-router-dom";

const LogoutButtonComponent = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    navigate("/"); // Redirect to login page
  };
  return (
    <button
      onClick={handleLogout}
      className="text-sm md:text-base hover:bg-gray-700 p-2 rounded"
    >
      Log Out
    </button>
  );
};

export default LogoutButtonComponent;
