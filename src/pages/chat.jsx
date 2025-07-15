import { useState, useEffect, useRef } from "react";
import axios from "@/api/axios"; // your axios instance

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const username = localStorage.getItem("username");
  const chatBoxRef = useRef(null); // for auto-scrolling

  // ✅ Fetch messages every 3 seconds
  useEffect(() => {
    const fetchMessages = () => {
      axios.get("/api/messages")
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Fetch error:", err));
    };

    fetchMessages(); // Initial fetch
    const interval = setInterval(fetchMessages, 3000); // Poll every 3s

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // ... sendMessage, return JSX etc. (leave that as you already have)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-4">
        <h1 className="text-2xl font-bold text-center text-rose-600 mb-4">Our chat 😊</h1>
        <div
          ref={chatBoxRef}
          className="h-80 overflow-y-auto space-y-2 p-2 bg-rose-50 rounded-md"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.sender === username ? "bg-rose-200 ml-auto text-right" : "bg-gray-200 text-left"
              }`}
            >
              <p className="text-sm text-gray-700">{msg.sender}</p>
              <p className="font-medium">{msg.text}</p>
            </div>
          ))}
        </div>
        {/* Input and button */}
        <div className="flex gap-2 mt-4">
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
