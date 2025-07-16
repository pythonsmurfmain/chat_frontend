import { useEffect, useState } from "react";
import axios from "@/api/axios";
import Login from "@/pages/login";
import Chat from "@/pages/chat";

export default function App() {
  const [username, setUsername] = useState(null);

  // 🔁 On mount, check if user session is still valid
  useEffect(() => {
    axios
      .get("/api/me", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch(() => {
        setUsername(null); // session invalid or not logged in
      });
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return username ? (
    <Chat username={username} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
