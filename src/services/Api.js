import axios from "axios";

export default options => {
  const api = axios.create(options);
  return api;
};
