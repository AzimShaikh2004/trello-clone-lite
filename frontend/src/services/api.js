import axios from "axios";

const API = axios.create({
  baseURL: "https://trello-clone-lite.onrender.com/api",
});

// Add token to every request if it exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;