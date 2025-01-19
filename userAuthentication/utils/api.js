import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://YourAPi/api", // Replace with your API's base URL
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {

      toast.error("Session expired. Please log in again.");

      localStorage.removeItem("token");
      localStorage.removeItem("data");

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }

    return Promise.reject(error);
  }
);

export default api;

