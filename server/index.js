const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","http://192.168.0.109:3000"],
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const rooms = {}; // Stores drawing history and chat messages for each room

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    
    if (!rooms[roomId]) {
      rooms[roomId] = { drawings: [], messages: [] };
    }

    // Send existing data to the newly joined user
    socket.emit("load-canvas", rooms[roomId].drawings);
    socket.emit("load-messages", rooms[roomId].messages);
  });

  socket.on("draw", ({ roomId, x, y, prevX, prevY, color, width }) => {
    if (!rooms[roomId]) return;
    
    rooms[roomId].drawings.push({ x, y, prevX, prevY, color, width });
    socket.to(roomId).emit("draw", { x, y, prevX, prevY, color, width });
  });

  socket.on("clear-canvas", (roomId) => {
    if (rooms[roomId]) rooms[roomId].drawings = [];
    io.to(roomId).emit("clear-canvas");
  });

  socket.on("send-message", ({ roomId, message, sender }) => {
    console.log(`Received message${message} from ${sender} in room${roomId}`);
    if (!roomId) return;

    const newMessage = { text: message, sender };
    
    // Save message in room
    rooms[roomId].messages.push(newMessage);

    // Broadcast message to all users in the room
    io.to(roomId).emit("receive-message", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
