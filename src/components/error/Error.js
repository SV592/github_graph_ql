import React from 'react';
import './Error.css';

function Error({ errorMessage }) {
    return (
        <div className="error-message">
            <p>{errorMessage}</p>
        </div>
    );
}

export default Error;
