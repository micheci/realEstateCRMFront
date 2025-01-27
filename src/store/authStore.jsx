import { useState } from "react";
import { loginUser } from "../service/authService";

export const useAuthStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      console.log(data, "instore");
      setUser(data); // Store user data (e.g., token, user details)
      localStorage.setItem("authToken", data.token);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { user, isLoading, error, login };
};
