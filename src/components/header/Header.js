import React from 'react';
import './Header.css';
// import logo from '../assets/github.png';
import logo from '../assets/graphql.png';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                {/* You can replace this text with a logo */}
                <img src={logo} alt="GitHub Logo" />
                <h1>GitHub Repo Info</h1>
            </div>
            <div className="user-info">
                {/* Once you handle authentication, you can display user info here */}
                <p>Welcome, User</p>
            </div>
        </header>
    );
}

export default Header;
