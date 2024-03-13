import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    <div>
      <img src={img} alt="not found" />
      <h3>Nothing here</h3>
      <Link to="/dashboard">back home</Link>
    </div>;
  }

  return (
    <Wrapper>
      <div>
        <h3>Beyond Your Reach</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
