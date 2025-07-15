import { useState } from "react";
import axios from "@/api/axios"; // adjust if needed
import { motion } from "framer-motion";
export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    if (!username.trim()) return;

    try {
      const res = await axios.post("/api/login", { username });
      const { username: u, sessionId } = res.data;
      onLogin(u, sessionId);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-rose-500 flex items-center justify-center px-4">
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-2xl shadow-xl p-6 sm:p-8 md:p-10"
>


        <h1 className="text-2xl font-bold text-center text-rose-600 mb-4">
          Welcome 😊
        </h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-400 focus:outline-none"
        />
        <button
          onClick={handleLogin}
          className="mt-4 w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition"
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}
