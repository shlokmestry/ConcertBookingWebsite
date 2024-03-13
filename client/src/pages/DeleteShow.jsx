import React from "react";
import fetch from "../utils/fetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await fetch.delete(`/shows/${params.id}`);
    Toast.success("Show Deleted");
  } catch (error) {
    Toast.error(error?.reponse?.data?.msg);
  }
  return redirect("dashboard/all-shows");
};

const DeleteShow = () => {
  return (
    <div>
      <h1>DeleteShow</h1>
    </div>
  );
};

export default DeleteShow;
