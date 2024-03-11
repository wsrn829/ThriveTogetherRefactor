import { useState } from "react";
import axios from "axios";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const register = async (accountData, url) => {
    try {
      const response = await axios.post(url, accountData);
      if (response.data.token) {
        saveToken(response.data);
      }
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  };

  async function login(username, password) {
    const url = `${process.env.REACT_APP_API_HOST}/api/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Save the token to state (or wherever you're storing it)
      setToken(data.token);
    } catch (error) {
      console.error("There was a problem with the login request: ", error);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    setToken: saveToken,
    token,
    register,
    login,
    logout,
  };
}
