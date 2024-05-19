import React from 'react';
import './list.css'

function MessageList({ messages }) {
    if (!Array.isArray(messages)) {
        return null; 
    }
    
    return (
        <div className="message-list">
        {messages.map((message, index) => (
            <div key={index} className={`message ${message.user === 'You' ? 'msg' : ''}`}>
                <div className="message-info">
                    <span className="message-user">{message.user}</span>
                    <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="message-content">{message.message}</div>
            </div>
        ))}
    </div>
    );
}

export default MessageList;
