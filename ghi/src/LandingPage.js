import React from "react";
import Lottie from "lottie-react";
import animation from "./animation.json";
import logo from "./images/thrivetogether2.png";
import { NavLink } from "react-router-dom";

const LandingPage = () => (
  <>
    <div className="logo-container circle bg-darkblue">
      <img
        src={logo}
        alt="Logo"
        className="d-inline-block align-text-top logo circle"
      />
    </div>
    <header className="bg-darkblue">
      <div className="nav-container landing-nav">
        <nav className="navbar nav navbar-expand-lg">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="vertical-nav bg-midblue dark-text"></div>
    </header>
    <main className="main-content landing-page">
      <div className="tagline">
        <h1 className="content-container rounded-edges d-flex justify-content-center">
          Thrive Together
        </h1>
        <h3 className="content-container rounded-edges subtitle">
          Connecting like-minds
        </h3>
      </div>
      <div className="lottie">
        <Lottie
          animationData={animation}
          style={{
            height: "25%",
            zIndex: -1,
            overflow: "hidden",
            position: "static",
          }}
          loop={true}
        />
      </div>
    </main>
  </>
);

export default LandingPage;
