import { useState, useEffect, useRef } from "react";
import axios from "@/api/axios";
import { BsSun, BsMoon } from "react-icons/bs";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

export default function Chat({ username, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const chatBoxRef = useRef(null);

  // Fetch messages every 3s
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

  // Auto-scroll
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Send message
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

  // Emoji picker handler
  const addEmoji = (e) => {
    setInput((prev) => prev + e.native);
  };

  // Theme toggle
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-rose-200 to-pink-100"
      }`}
    >
      {/* Top right controls */}
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

      {/* Chat Box */}
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-4">
        <h1 className="text-2xl font-bold text-center text-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text animate-pulse mb-4">
          Our chat 😊
        </h1>

        {/* Messages */}
        <div
          ref={chatBoxRef}
          className="h-80 overflow-y-auto space-y-2 p-2 bg-white/70 backdrop-blur-md rounded-md"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`relative p-2 rounded-xl max-w-[80%] text-sm whitespace-pre-wrap break-words shadow-md ${
                msg.sender === username
                  ? "bg-rose-300 ml-auto text-right before:content-[''] before:absolute before:-right-2 before:top-2 before:border-t-8 before:border-t-rose-300 before:border-l-8 before:border-transparent"
                  : "bg-gray-300 text-left before:content-[''] before:absolute before:-left-2 before:top-2 before:border-t-8 before:border-t-gray-300 before:border-r-8 before:border-transparent"
              }`}
            >
              <p className="text-xs text-gray-600">{msg.sender}</p>
              <p className="font-medium">{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-xl px-3 py-1 bg-rose-400 text-white rounded-md hover:bg-rose-500"
            >
              😊
            </button>
            <button
              onClick={sendMessage}
              className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
            >
              Send
            </button>
          </div>

          {showEmojiPicker && (
            <div className="mt-1">
              <Picker data={data} onEmojiSelect={addEmoji} theme={darkMode ? "dark" : "light"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
