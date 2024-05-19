import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function ChatRoom() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch initial messages from the server
        fetchMessages();

        // Listen for new messages from the server
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/messages');
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = (message) => {
        socket.emit('sendMessage', message);
    };

    return (
        <div>
            <h1>Chat Room</h1>
            <MessageList messages={messages} />
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
}

export default ChatRoom;
