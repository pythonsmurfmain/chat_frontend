// Chat.jsx
import { useState, useEffect, useRef } from "react";
import axios from "@/api/axios"; // adjust if needed
import { BsSun, BsMoon } from "react-icons/bs";

export default function Chat({ username, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const fetchMessages = () => {
      axios
        .get("/api/messages")
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Fetch error:", err));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { sender: username, text: input };
    try {
      await axios.post("/api/messages", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-rose-200 to-pink-100"
      }`}
    >
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 text-xl bg-white/30 backdrop-blur-md rounded-full shadow-md hover:scale-105 transition"
        >
          {darkMode ? <BsSun /> : <BsMoon />}
        </button>
        <button
          onClick={onLogout}
          className="px-3 py-1 text-sm rounded-full bg-white/30 backdrop-blur-md shadow-md hover:bg-white/60 hover:text-black transition"
        >
          Logout
        </button>
      </div>

      <div className="w-full max-w-md sm:max-w-lg bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-4">
        <h1
          className="text-2xl font-bold text-center text-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text animate-pulse mb-4"
        >
          Our chat 😊
        </h1>

        <div
          ref={chatBoxRef}
          className="h-80 overflow-y-auto space-y-2 p-2 bg-white/70 backdrop-blur-md rounded-md"
        >
          {messages.map((msg, idx) => {
            const isUser = msg.sender === username;
            return (
              <div
                key={idx}
                className={`relative p-3 rounded-lg max-w-[75%] text-sm shadow-md ${
                  isUser
                    ? "bg-rose-500 text-white ml-auto rounded-br-none"
                    : "bg-gray-200 text-gray-900 mr-auto rounded-bl-none"
                }`}
              >
                {!isUser && (
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    {msg.sender}
                  </p>
                )}
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              onClick={sendMessage}
              className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 w-full sm:w-auto"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
