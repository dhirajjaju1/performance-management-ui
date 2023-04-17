import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL+"/api/test/";

const getPublicContent = () => {
  console.log(process.env.REACT_APP_API_URL);
  return axios.get(API_URL + "all");
};

const TestService = {
  getPublicContent
};

export default TestService;
