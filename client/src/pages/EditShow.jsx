import React from "react";
import { FormRow, FormRowSelect } from "../component";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { SHOW_TIMING } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import fetch from "../utils/fetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await fetch.get(`/shows/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.reponse?.data?.msg);
    return redirect("/dashboard/all-shows");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await fetch.patch(`/shows/${params.id}`, data);
    toast.success("Show Edited Success");
    return redirect("/dashboard/all-shows");
  } catch (error) {
    toast.error(error?.reponse?.data?.msg);
    return error;
  }
};

const EditShow = () => {
  const { show } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit show</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="show_artist"
            defaultValue={show.show_artist}
          />
          <FormRow type="text" name="show_type" defaultValue={show.show_type} />
          <FormRow
            type="text"
            name="show_location"
            defaultValue={show.show_location}
          />
          <FormRow
            type="text"
            name="show_location"
            labelText="show location"
            defaultValue={show.show_location}
          />
          <FormRowSelect
            name="show_Timing"
            labelText="show timing"
            defaultValue={show_Timing}
            list={Object.values(SHOW_TIMING)}
          />
          <FormRow
            type="text"
            name="show_Description"
            defaultValue={show.show_Description}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}>
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditShow;
