import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Shows";
import ShowsInfo from "./ShowsInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Show = ({
  _id,
  show_artist,
  show_type,
  show_location,
  show_Description,
}) => {
  const date = day(createdAt).format("MMM Do, YYYy");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{show_artist.charAt(0)}</div>
        <div className="info">
          <h5>{show_type}</h5>
          <p>{show_artist}</p>
          <p>{show_Description}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ShowsInfo icon={<FaLocationArrow />} text={show_location} />
          <ShowsInfo icon={<FaCalendarAlt />} text={date} />
        </div>
        <footer className="action">
          <Link to={`../edit-show/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-show/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Show;
