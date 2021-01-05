import axios from "axios";

const axiosFetch = axios.create({
  baseURL: "https://singi-media.herokuapp.com",
  // baseURL: "http://localhost:9000",
  withCredentials: true,
});

export { axiosFetch };
