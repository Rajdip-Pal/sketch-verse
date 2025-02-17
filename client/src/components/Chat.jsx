import { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Initialize socket connection
const socket = io("http://192.168.0.109:5000"); 
window.socket = socket; // Make socket accessible in console for debugging

const Chat = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);  // Store messages
  const [input, setInput] = useState("");  // Store user input

  useEffect(() => {
    console.log("Joining room:", roomId);
    socket.emit("join-room", roomId); // Join chat room

    // Load previous messages
    socket.on("load-messages", (loadedMessages) => {
      console.log("Loaded messages:", loadedMessages);
      setMessages(loadedMessages || []);
    });

    // Listen for new incoming messages
    socket.on("receive-message", (message) => {
      console.log("Received message from server:", message);
      if (message?.text?.trim()) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Cleanup listeners when component unmounts
    return () => {
      socket.off("load-messages");
      socket.off("receive-message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!input.trim()) {
      console.warn("Cannot send an empty message");
      return; // Prevent sending empty messages
    }

    const messageData = { text: input.trim(), sender: username, roomId };

    console.log("Sending message:", messageData);

    socket.emit("send-message", messageData); // Send message to server

    // Update UI immediately (optimistic update)
    setMessages((prevMessages) => [...prevMessages, messageData]);

    setInput(""); // Clear input after sending
  };

  return (
    <div className="fixed bottom-10 right-4 w-1/4 h-3/4 bg-gray-900 text-white flex flex-col rounded-t-lg shadow-lg">
      {/* Chat messages display */}
      <div className="flex-1 overflow-auto p-2 space-y-2">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="p-2 rounded-lg bg-gray-700">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Input box & send button */}
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
