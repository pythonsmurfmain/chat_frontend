import axios from "axios";

// Set global default for credentials
axios.defaults.withCredentials = true;

// Create axios instance
const instance = axios.create({
  baseURL: "https://chat-backend-x2zf.onrender.com",
  withCredentials: true, // Ensure cookies are sent
});

export default instance;
