import React from "react";
import Wrapper from "../assets/wrappers/ShowsInfo";

const ShowsInfo = () => {
  return (
    <Wrapper>
      <span className="job-icon">{icon} </span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default ShowsInfo;
