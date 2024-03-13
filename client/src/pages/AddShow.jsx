import React from "react";
import { FormRow, FormRowSelect } from "../component";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { Form, useNavigation, redirect } from "react-router-dom";
import { SHOW_TIMING, SORT_SHOWS } from "../../../utils/constants";
import { toast } from "react-toastify";
import fetch from "../utils/fetch";
import userModel from "../../../models/userModel";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await fetch.post("/shows", data);
    toast.success("Show created");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddShow = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Show</h4>
        <div className="form-center">
          <FormRow type="text" name="show_artist" />
          <FormRow type="text" name="show_type" />
          <FormRow
            type="text"
            labelText="show location"
            name="show_location"
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText="Show Timing"
            name="show_timing"
            defaultValue={SHOW_TIMING.EVENING}
            list={Object.values(SHOW_TIMING)}
          />
          <button
            type="submit"
            className="btn btn-block from-btn"
            disabled={isSubmitting}>
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddShow;
