import { useState, useEffect } from "react";
import axios from "@/api/axios";
import Chat from "@/pages/chat";
import Login from "@/pages/login";

export default function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    axios.get("/api/me")
      .then(res => setUsername(res.data.username))
      .catch(() => setUsername(null));
  }, []);

  return (
    <>
      {username ? <Chat username={username} /> : <Login setUsername={setUsername} />}
    </>
  );
}
