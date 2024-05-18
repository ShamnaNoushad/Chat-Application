import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function ChatRoom() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for new messages from the server
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up socket connection on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

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
