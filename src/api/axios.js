import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-backend-x2zf.onrender.com/", // Replace with your actual Render backend URL
  withCredentials: true,
});

export default instance;
