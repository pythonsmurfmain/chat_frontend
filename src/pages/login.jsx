import { useState } from "react";
import axios from "@/api/axios"; // adjust path if needed

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
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-rose-600">Enter Username</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-rose-400"
          placeholder="Your name"
        />
        <button
          onClick={handleLogin}
          className="mt-4 w-full bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600"
        >
          Join Chat
        </button>
      </div>
    </div>
  );
}
