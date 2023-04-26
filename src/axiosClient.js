import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://randomuser.me/api',
});

export default axiosClient;