import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.0.109:5000");

const Chat = ({roomId,username,avatar}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {  
  console.log("Joining room:", roomId);
  socket.emit("join-room", roomId);  
    socket.on("load-messages", (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Listen for new messages
    socket.on("receive-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("load-messages");
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const messageData = { message: input, sender: username, roomId};
      socket.emit("send-message", messageData);
      console.log("Sending message:", messageData);
      setMessages([...messages, messageData]);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-10 right-4 w-1/4 h-3/4 bg-gray-900 text-white flex flex-col rounded-t-lg shadow-lg">
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
