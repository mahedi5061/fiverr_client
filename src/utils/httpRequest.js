import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://fiverr-clone-api.onrender.com/api",

  // withCredentials: true,
});

export default httpRequest;
