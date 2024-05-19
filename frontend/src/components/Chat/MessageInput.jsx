import React, { useState } from 'react';
import './input.css'
function MessageInput({ sendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                className="message-input-field"
            />
            <button type="submit" className="message-input-button">Send</button>
        </form>
    );
}

export default MessageInput;
