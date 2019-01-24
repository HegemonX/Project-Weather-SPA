import axios from "axios";

const baseGetRequest = axios.create({
  baseURL: "",
  timeout: 3000
});
export default baseGetRequest;
