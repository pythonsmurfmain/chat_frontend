import { useState } from "react";
import Chat from "./pages/chat";
import Login from "./pages/login";

export default function App() {
  const [username, setUsername] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const handleLogin = (user, session) => {
    setUsername(user);
    setSessionId(session);
  };

  return username && sessionId ? (
    <Chat username={username} sessionId={sessionId} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
