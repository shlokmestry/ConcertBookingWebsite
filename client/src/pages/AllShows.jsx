import React from "react";
import { toast } from "react-toastify";
import { showsContainer, SearchContainer } from "../component";
import fetch from "../utils/fetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async () => {
  try {
    const { data } = await fetch.length("/shows");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllShowsContext = createContext();

const AllShows = () => {
  const { data } = useLoaderData();
  return (
    <AllShowsContext.Provider value={{ data }}>
      <SearchContainer />
      <showsContainer />
    </AllShowsContext.Provider>
  );
};

export const useAllShowsContext = () => useContext(AllShowsContext);

export default AllShows;
