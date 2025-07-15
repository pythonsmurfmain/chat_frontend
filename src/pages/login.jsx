import { useState } from "react";
import axios from "@/api/axios"; // adjust if needed

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
    <div className="min-h-screen flex items-center justify-center bg-rose-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-rose-600 mb-4">
          Our Chat 😊
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
          className="mt-4 w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
}
