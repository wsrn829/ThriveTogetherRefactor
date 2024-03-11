import useToken from "./useToken";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
  };

  return (
    <div className="content-container bg-text rounded-edges d-flex justify-content-center">
      {!token && (
        <form onSubmit={(e) => handleSubmit(e)} style={{ width: "750px" }}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              name="username"
              type="text"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      )}
      {token && (
        <div>
          <h3>Already logged in!</h3>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
