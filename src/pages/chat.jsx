// Chat.jsx
import { useState, useEffect, useRef } from "react";
import axios from "@/api/axios"; // adjust if needed

export default function Chat({ username, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-rose-600">Our chat 😊</h1>
          <button
            onClick={onLogout}
            className="text-sm text-rose-500 hover:text-rose-700"
          >
            Logout
          </button>
        </div>

        <div
          ref={chatBoxRef}
          className="h-80 overflow-y-auto space-y-2 p-2 bg-rose-50 rounded-md"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.sender === username
                  ? "bg-rose-200 ml-auto text-right"
                  : "bg-gray-200 text-left"
              }`}
            >
              <p className="text-sm text-gray-700">{msg.sender}</p>
              <p className="font-medium">{msg.text}</p>
            </div>
          ))}
        </div>

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
