import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.error(error.message);
    return Promise.reject(error);
  }
);

export default apiClient;