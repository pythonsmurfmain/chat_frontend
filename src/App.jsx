import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "@/pages/chat";
import Login from "@/pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
