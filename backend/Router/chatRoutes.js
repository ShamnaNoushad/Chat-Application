const express = require('express');
const router = express.Router();
const Chat = require('../Models/Chat');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch chat messages
router.get('/messages', authMiddleware, async (req, res) => {
    try {
        const messages = await Chat.find();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post a new chat message
router.post('/messages', authMiddleware, async (req, res) => {
    const { user, message } = req.body;
    try {
        const chatMessage = new Chat({ user, message });
        await chatMessage.save();
        res.status(201).json(chatMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
