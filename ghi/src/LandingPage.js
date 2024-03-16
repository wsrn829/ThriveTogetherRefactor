import React from "react";
import Lottie from "lottie-react";
import animation from "./animation.json";
import "./App.css";
import "./Mobile.css";

const LandingPage = () => (
  <>
    <main className="landing-page-content">
      <div className="tagline">
        <h1 className="content-container rounded-edges d-flex justify-content-center">
          Thrive Together
        </h1>
        <h3 className="content-container rounded-edges subtitle">
          Connecting like-minds
        </h3>
      </div>
      <div className="lottie">
        <Lottie animationData={animation} loop={true} />
      </div>
    </main>
  </>
);

export default LandingPage;
