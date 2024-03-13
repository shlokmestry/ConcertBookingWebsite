import React from "react";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { useLoaderData, redirect } from "react-router-dom";
import fetch from "../utils/fetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";
import { StatsItem } from "../component";

export const loader = async () => {
  try {
    const response = await fetch.get("/users/admin/show-stats");
    return response.data;
  } catch (error) {
    toast.error("Not Authorized to view this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const { users, shows } = useLoaderData();
  return (
    <Wrapper>
      <StatsItem
        title="current users"
        count={users}
        color="#e9b949"
        bgColor="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatsItem
        title="total shows"
        count={shows}
        color="#647acb"
        bgColor="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
