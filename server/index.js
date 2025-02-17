const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://192.168.0.104:3000', `${process.env.WEB_PAGE}`],
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

const rooms = {}; // Stores drawing history and chat messages for each room
const lobbies = {}; // Stores players per gameId

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Joining a specific game room
    socket.on("join-lobby", ({ username, avatar, gameId }) => {
        if (!gameId) return;

        socket.join(gameId); // Ensures players are in the correct game room

        if (!lobbies[gameId]) {
            lobbies[gameId] = [];
        }

        const player = { socketId: socket.id, username, avatar, gameId };

        if (!lobbies[gameId].some((p) => p.socketId === socket.id)) {
            lobbies[gameId].push(player);
        }

        console.log(`Player ${username} joined lobby ${gameId}.`);
        io.to(gameId).emit("update-players", [...lobbies[gameId]]); // Update only relevant room
    });

    // Handling leaving the lobby
    socket.on("leave-lobby", ({ socketId, gameId }) => {
        if (!gameId || !lobbies[gameId]) return;

        lobbies[gameId] = lobbies[gameId].filter((player) => player.socketId !== socketId);
        
        if (lobbies[gameId].length === 0) {
            delete lobbies[gameId]; // Remove empty rooms
        }

        io.to(gameId).emit("update-players", lobbies[gameId]); // Update remaining players
    });

    // Joining a drawing room
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

    // Drawing event
    socket.on("draw", ({ roomId, x, y, prevX, prevY, color, width }) => {
        if (!rooms[roomId]) return;

        rooms[roomId].drawings.push({ x, y, prevX, prevY, color, width });
        socket.to(roomId).emit("draw", { x, y, prevX, prevY, color, width });
    });

    // Clearing the canvas
    socket.on("clear-canvas", (roomId) => {
        if (rooms[roomId]) rooms[roomId].drawings = [];
        io.to(roomId).emit("clear-canvas");
    });

    // Sending messages in the chat
    socket.on("send-message", ({ roomId, message, sender }) => {
        if (!roomId) return;

        const newMessage = { text: message, sender };
        rooms[roomId].messages.push(newMessage);
        io.to(roomId).emit("receive-message", newMessage);
    });

    // Disconnect handling
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        
        // Remove player from lobbies
        for (const gameId in lobbies) {
            lobbies[gameId] = lobbies[gameId].filter(player => player.socketId !== socket.id);
            io.to(gameId).emit("update-players", lobbies[gameId]);
            if (lobbies[gameId].length === 0) delete lobbies[gameId];
        }
    });
});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});
