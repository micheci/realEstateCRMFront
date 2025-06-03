// src/components/Login.jsx
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, isLoading, error, user } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router's hook to navigate programmatically
  // useEffect to navigate to dashboard when user is set
  useEffect(() => {
    if (user) {
      navigate("/myproperties"); // Redirect to dashboard when user is logged in
    }
  }, [user, navigate]); // Run effect when `user` changes
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    // If login is successful, navigate to the dashboard
    console.log(user, "updateduser");
    if (!error && user) {
      navigate("/myproperties"); // Navigate to the dashboard page
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-6">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Display loading or error */}
          {isLoading && <p className="text-blue-500">Loading...</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
