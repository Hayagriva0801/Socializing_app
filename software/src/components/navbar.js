import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../assets/logo1.png";
import "../styles/navbar.css"

function Navbar() {
    return (
        <div className="navbar">
            <div className="leftside">
                <img src={Logo} alt="Logo" />   
            </div>
            <div className="rightside">
                <Link to="/main">Home</Link>
                <Link to="/dashboard">Create Notice</Link>
                <Link to="/chats">Chats</Link>
            </div>
        </div>
    );
}

export default Navbar;
