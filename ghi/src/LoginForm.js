// import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthActions from "./AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useAuthActions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      await login(username, password);
      setUsername("");
      setPassword("");
      navigate("/info");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="content-container bg-text rounded-edges d-flex justify-content-center">
      {!token ? (
        <form onSubmit={handleSubmit} style={{ width: "750px" }}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      ) : (
        <div>
          <h3>Already logged in!</h3>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
