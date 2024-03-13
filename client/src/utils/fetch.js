import axios from "axios";

const fetch = axios.create({
  baseURL: "/api/v1",
});

export default fetch;
