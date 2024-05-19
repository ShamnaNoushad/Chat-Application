import React from 'react';

function MessageList({ messages }) {
    if (!Array.isArray(messages)) {
        return null; // or return some error message
    }

    return (
        <ul>
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </ul>
    );
}

export default MessageList;
