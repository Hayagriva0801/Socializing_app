import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo1.png";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear all local storage
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="navbar">
            <div className="leftside">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="rightside">
                <Link to="/main">Home</Link>
                <Link to="/dashboard">Create Notice</Link>
                <Link to="/chats">Chats</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </div>
    );
}

export default Navbar;

