import axios from "axios";

const customFetch = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? `http://localhost:5001/api/v1`
      : "/api",
  withCredentials: true,
});

export default customFetch;
