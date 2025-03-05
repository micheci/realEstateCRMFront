import axios from "axios";

export const loginUser = async (email, password) => {
  try {
    console.log("in service");

    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    // If the error is not a network error, you can handle it here
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
