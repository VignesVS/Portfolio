import axios from "axios";

// Use environment variable or default to localhost
const adminApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token if available
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;
