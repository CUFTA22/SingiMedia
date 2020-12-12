import axios from "axios";

const publicFetch = axios.create({
  baseURL: "http://localhost:9000",
});

export { publicFetch };
