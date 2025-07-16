import { useState, useEffect, useRef } from "react";
import axios from "@/api/axios";
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
    if (!input.trim()) return;

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
      className={`min-h-screen p-4 transition-all duration-500 flex flex-col items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-pink-50 text-black"
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

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-4">
        <h1 className="text-2xl font-bold text-center text-rose-500 mb-4">
          Our chat 😊
        </h1>

        <div
          ref={chatBoxRef}
          className={`h-80 overflow-y-auto space-y-2 p-2 rounded-md ${
            darkMode ? "bg-gray-800" : "bg-rose-100"
          }`}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] shadow-md text-sm whitespace-pre-wrap break-words ${
                msg.sender === username
                  ? `${
                      darkMode
                        ? "bg-rose-600 text-white ml-auto text-right"
                        : "bg-rose-300 text-black ml-auto text-right"
                    }`
                  : `${
                      darkMode
                        ? "bg-gray-700 text-white text-left"
                        : "bg-gray-200 text-black text-left"
                    }`
              }`}
            >
              <p className="text-xs font-semibold">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4 w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <button
            onClick={sendMessage}
            className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
