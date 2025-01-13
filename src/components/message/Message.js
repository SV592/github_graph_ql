import React from 'react';
import './Message.css';

function Message({ message, type }) {
    return (
        <div className={`message ${type === 'error' ? 'error-message' : 'success-message'}`}>
            <p>{message}</p>
        </div>
    );
}

export default Message;
