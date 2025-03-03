import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Chats = () => {
  const [users, setUsers] = useState([]);
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
              user.username !== currentUser && ( // Hide the current user from the list
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

      {/* Right Side - Chat Window with Message */}
      <div style={{ 
        width: "70%", 
        backgroundColor: "#f0f0f0",  
        display: "flex", 
        alignItems: "center",
        justifyContent: "center"
      }}>
        <h2 style={{ color: "#075e54", fontSize: "24px" }}>Select a chat to start messaging</h2>
      </div>
    </div>
  );
};

export default Chats;
