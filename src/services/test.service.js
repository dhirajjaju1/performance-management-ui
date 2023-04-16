import axios from "axios";
import { API_ENDPOINT } from "../common/constant";

const API_URL = API_ENDPOINT+"/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const TestService = {
  getPublicContent
};

export default TestService;
