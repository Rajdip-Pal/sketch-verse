import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("");

  const sendMessage = () => {
    if (input.trim() && user.trim()) {
      setMessages([...messages, { text: input, sender: user }]);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-1/4 bg-gray-900 text-white flex flex-col">
      <div className="flex-1 overflow-auto p-2 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 rounded-lg bg-gray-700">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-2 bg-gray-800">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-2 text-black rounded-lg w-1/4 mr-2"
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 text-black rounded-lg flex-1"
        />
        <button onClick={sendMessage} className="bg-blue-500 p-2 rounded-lg ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
