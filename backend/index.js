// Load .env file into process.env
require('dotenv').config(); 

// Import modules
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./DB/connection');
const authRoutes = require('./Router/authRoutes');
const chatRoutes = require('./Router/chatRoutes');
const { createDemoUser } = require('./Controller/userController');

// Connect to MongoDB Atlas
connectDB().then(() => {
    createDemoUser(); // Create demo user after DB connection is established
});

// Create a backend application using Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use middleware
app.use(cors());
app.use(express.json()); // Returns middleware that only parses JSON

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Port creation
const PORT = process.env.PORT || 4000;

// Server listen
server.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

// HTTP GET route resolving to 
app.get("/", (req, res) => {
    res.send('<h1>Chat App Generated.....</h1>');
});
