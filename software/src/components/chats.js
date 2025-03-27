import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // Store messages
  const currentUser = localStorage.getItem("currentUser"); // Logged-in user
  const { username: selectedChat } = useParams(); // Get selected chat user

  useEffect(() => {
    if (!currentUser) return;

    axios.get("http://127.0.0.1:5000/all_users") // Fetch all registered users
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, [currentUser]);

  // Fetch chat messages when the selectedChat changes
  useEffect(() => {
    if (!selectedChat) return;

    axios.get(`http://127.0.0.1:5000/chats/${selectedChat}`) // API to get messages
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error("Error fetching messages:", error));
  }, [selectedChat]); // Runs every time the chat user changes

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Sidebar - Chat List */}
      <div style={{ 
        width: "30%", 
        backgroundColor: "#054d44",  // Dark green sidebar
        padding: "20px", 
        overflowY: "scroll",
        borderRight: "2px solid #bbb",
        color: "white"
      }}>
        <h2 style={{ marginBottom: "15px", color: "#dff0d8", fontSize: "22px" }}>Chats</h2>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {users.length > 0 ? (
            users.map((user, index) => (
              user.username !== currentUser && ( // Hide current user from list
                <li key={index} style={{ 
                  padding: "12px", 
                  marginBottom: "5px",
                  borderBottom: "1px solid #aaa",
                  backgroundColor: user.username === selectedChat ? "#0f766e" : "transparent", // Highlight selected chat
                  cursor: "pointer",
                  borderRadius: "8px"
                }}>
                  <Link to={`/chat/${user.username}`} style={{ textDecoration: "none", color: "white", fontWeight: "bold", display: "block" }}>
                    {user.username}
                  </Link>
                </li>
              )
            ))
          ) : (
            <p>No users available</p>
          )}
        </ul>
      </div>

      {/* Right Side - Chat Window */}
      <div style={{ 
        width: "70%", 
        backgroundColor: "#f0f0f0",  
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
        <h2 style={{ color: "#075e54", fontSize: "24px" }}>Chat with {selectedChat}</h2>
        <div style={{ width: "80%", maxHeight: "70vh", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <p key={index} style={{ padding: "5px", backgroundColor: msg.sender === currentUser ? "#d1e7dd" : "#f8d7da", borderRadius: "10px", marginBottom: "5px" }}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))
          ) : (
            <p>No messages yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
