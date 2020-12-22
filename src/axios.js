import axios from "axios";

const axiosFetch = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});

export { axiosFetch };
