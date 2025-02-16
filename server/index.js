const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://192.168.0.104:3000'],
        methods: ['GET', 'POST'],
    },
});

app.use(cors());

io.on('connection', socket => {
    console.log('A user connected');

    // Join a specific room based on URL param
    socket.on('join-room', roomId => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    // Broadcast drawing to users in the same room
    socket.on('draw', ({ roomId, x, y, prevX, prevY, color, width }) => {
        socket.to(roomId).emit('draw', { x, y, prevX, prevY, color, width });
    });

    // Broadcast reset-canvas event to all users in the room
    socket.on('reset-canvas', data => {
        socket.to(data.roomId).emit('reset-canvas');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(5000, () => {
    console.log('Server running on port 5000');
});
