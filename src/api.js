import axios from "axios";

const API = axios.create({
  baseURL: "https://satriiadaffa.site",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan token ke setiap request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ambil token dari Local Storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

//   console.log("Token yang digenerate",token);
  return config;
  
});

export default API;
