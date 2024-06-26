import React, { useState } from "react";
import useAuthActions from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AccountForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [email, setEmail] = useState("");
  const { register } = useAuthActions();
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const accountData = {
      username: username,
      password: password,
      name: name,
      age: age,
      gender: gender,
      pronouns: pronouns,
      email: email,
    };
    try {
      await register(
        accountData,
        `${process.env.REACT_APP_API_HOST}/api/accounts`
      );
      e.target.reset();
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div className="content-container bg-text rounded-edges d-flex justify-content-center">
      <h5 className="card-header">Sign Up</h5>
      <div className="card-body">
        <form onSubmit={(e) => handleRegistration(e)}>
          <br></br>
          <br></br>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              required
              className="form-control"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              required
              className="form-control"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              type="text"
              required
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              name="age"
              type="text"
              required
              className="form-control"
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <input
              name="gender"
              type="text"
              required
              className="form-control"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Pronouns</label>
            <input
              name="pronouns"
              type="text"
              required
              className="form-control"
              onChange={(e) => {
                setPronouns(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="text"
              required
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="d-flex justify-content-center">
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
