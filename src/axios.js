import axios from "axios";

const axiosFetch = axios.create({
  baseURL: "http://localhost:9000",
});
axiosFetch.defaults.withCredentials = true;

export { axiosFetch };
