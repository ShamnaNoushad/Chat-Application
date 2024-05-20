require('dotenv').config();

// Import modules
const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/connection');
const authRoutes = require('./Router/authRoutes');
const chatRoutes = require('./Router/chatRoutes');
const { Server } = require('socket.io');

// Connect to MongoDB Atlas
connectDB().then(() => {
    console.log('Connected to MongoDB Atlas');
});

// backend app using Express
const app = express();

// Use middleware
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from only http://localhost:3000
}));
app.use(express.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Create HTTP server and integrate Socket.io
const server = app.listen(process.env.PORT || 4000, () => {
    console.log('Listening on port ' + (process.env.PORT || 4000));
});

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
});

app.set('io', io);

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

// HTTP GET route resolving to 
app.get("/", (req, res) => {
    res.send('<h1>Chat App Generated.....</h1>');
});
