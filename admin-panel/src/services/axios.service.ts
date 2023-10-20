import axios from "axios";
console.log(process.env.REACT_APP_MAILING_BACKEND);
export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_MAILING_BACKEND,
});
