import { useState } from "react";
import Login from "./pages/login";
import Chat from "./pages/chat";

export default function App() {
  const [username, setUsername] = useState(null);

  const handleLogin = (u) => {
    setUsername(u);
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
