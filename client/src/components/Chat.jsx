import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Initialize socket connection
const socket = io('https://sketch-verse-backend.vercel.app', { transports: ['websocket'] }); // Ensure websocket transport

const Chat = ({ roomId, username }) => {
    const [messages, setMessages] = useState([]); // Store messages
    const [input, setInput] = useState(''); // Store user input

    useEffect(() => {
        if (!roomId) {
            console.error('Room ID is missing!');
            return;
        }

        console.log('Joining room:', roomId);
        socket.emit('join-room', roomId); // Join chat room

        // Load previous messages
        socket.on('load-messages', loadedMessages => {
            console.log('Loaded messages:', loadedMessages);
            setMessages(loadedMessages || []);
        });

        // Listen for new messages
        socket.on('receive-message', message => {
            console.log('Received message:', message);
            setMessages(prevMessages => [...prevMessages, message]); // Update messages in real-time
        });

        return () => {
            socket.off('load-messages');
            socket.off('receive-message');
        };
    }, [roomId]); // Ensure effect runs when `roomId` changes

    const sendMessage = () => {
        if (!input.trim()) {
            console.warn('Cannot send an empty message');
            return;
        }

        const messageData = { message: input.trim(), sender: username, roomId };

        console.log('Sending message:', messageData);

        socket.emit('send-message', messageData); // Send to server
        setInput(''); // Clear input after sending
    };

    return (
        <div className="fixed bottom-0 right-0 w-[20%] h-full bg-gray-900 text-white flex flex-col rounded-t-lg shadow-lg">
            {/* Chat messages */}
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
                <input type="text" placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} className="p-2 text-black rounded-lg flex-1" />
                <button onClick={sendMessage} type="submit" className="bg-blue-500 p-2 rounded-lg ml-2">
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
