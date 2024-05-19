// Load .env file into process.env
require('dotenv').config();

// Import modules
const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const connectDB = require('./DB/connection');
const authRoutes = require('./Router/authRoutes');
const chatRoutes = require('./Router/chatRoutes');

// Connect to MongoDB Atlas
connectDB().then(() => {
    console.log('Connected to MongoDB Atlas');});

// Create a backend application using Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});
// Make the io instance available in routes
app.set('io', io);

// Use middleware
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from only http://localhost:3000
}));
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
