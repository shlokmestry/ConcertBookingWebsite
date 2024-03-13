import React from "react";
import styled from "styled-components";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../component";

const Landing = () => {
  return (
    <Wrapper>
      <div className="image">
        <div className="image-overlay">
          <nav>
            <Logo />
          </nav>
          <div className="container page">
            <div className="info">
              <h1>
                Book your favourite <span>Artists Show</span>
              </h1>
              <p>
                Immerse yourself in a realm where melodies paint vivid emotions
                and rhythms echo the heartbeat of the world. Let the concert
                begin! 🎶🎻🎹
              </p>
              <Link to="/register" className="btn register-link">
                Register
              </Link>
              <Link to="/login" className="btn ">
                Login / Guest
              </Link>
            </div>
            <img src={main} alt="knight hunt" className="img main-img" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
