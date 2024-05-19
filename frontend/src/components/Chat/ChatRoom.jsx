import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { io } from 'socket.io-client';
import logo1 from '../assets/chat.png'
import './room.css'
import { useNavigate } from 'react-router-dom';
const socket = io('http://localhost:4000');

function ChatRoom() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();

        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);

        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/chat/messages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            console.log(data);
            setMessages(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    };

    const sendMessage = async (message) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:4000/api/chat/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ user:'', message })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const navigate=useNavigate();
    const handleClick =async()=>{
        localStorage.clear();
        navigate("/")
    }
    return (
        <div>
            <div className='head'>
                <img src={logo1} alt="logo" />
                <h1 style={{
                    fontSize: '30px',
                    padding: '15px',
                    marginTop: '0px',
                    fontFamily: 'Times New Roman'
                }}>CHATIFY</h1>
                <button className="logout-button" onClick={handleClick}>Logout</button>
            </div>
            <MessageList messages={messages} />
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
}

export default ChatRoom;
