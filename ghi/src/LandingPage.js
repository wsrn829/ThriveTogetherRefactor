import React from "react";
import Lottie from "lottie-react";
import animation from "./animation.json";
import "./App.css";
import "./Mobile.css";

const LandingPage = () => (
  <div>
    <div className="tagline">
      <h1 className="content-container rounded-edges d-flex justify-content-center">
        ThriveTogether
      </h1>
      <h3 className="content-container rounded-edges subtitle">
        Connecting like-minds
      </h3>
    </div>
    <div className="lottie">
      <Lottie animationData={animation} loop={true} />
    </div>
  </div>
);

export default LandingPage;
