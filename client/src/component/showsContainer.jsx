import React from "react";
import Show from "./Show";
import Wrapper from "../assets/wrappers/ShowsContainer";
import { useAllShowsContext } from "../pages/AllShows";

const showsContainer = () => {
  const { data } = useAllShowsContext();
  const { shows } = data;
  if (shows.length === 0) {
    return (
      <Wrapper>
        <h2>No Shows</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {shows.map((show) => {
          return <Show key={show._id} {...show} />;
        })}
      </div>
    </Wrapper>
  );
};

export default showsContainer;
