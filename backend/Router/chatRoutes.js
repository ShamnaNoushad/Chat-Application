const express = require('express');
const router = express.Router();
const Chat = require('../Models/Chat');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch chat messages
router.get('/messages', authMiddleware, async (req, res) => {
    try {
        const messages = await Chat.find().limit(50); // Sort by timestamp and limit to 50 messages
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch messages: ' + err.message });
    }
});



// Post a new chat message
router.post('/messages', authMiddleware, async (req, res) => {
    const { message } = req.body;
    try {
        const user = req.payload.name
        console.log(user)
        const chatMessage = new Chat({ user, message });
        await chatMessage.save();

        // Emit the new message to all connected clients
        req.app.get('io').emit('receiveMessage', chatMessage);

        res.status(201).json(chatMessage);
    } catch (err) {
        res.status(400).json({ error: 'Failed to save message: ' + err.message });
    }
});

module.exports = router;
