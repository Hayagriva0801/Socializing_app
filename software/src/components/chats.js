import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const currentUser = localStorage.getItem("currentUser"); // Logged-in user
  const { username: selectedChat } = useParams(); // Get selected chat user

  useEffect(() => {
    if (!currentUser) return;

    axios.get("http://127.0.0.1:5000/all_users") // Fetch all users
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
        backgroundColor: "#054d44",  
        padding: "20px", 
        overflowY: "scroll",
        borderRight: "2px solid #bbb",
        color: "white"
      }}>
        <h2 style={{ marginBottom: "15px", color: "#dff0d8", fontSize: "22px" }}>Chats</h2>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {users.length > 0 ? (
            users.map((user, index) => (
              user.username !== currentUser && (
                <li key={index} style={{ 
                  padding: "12px", 
                  marginBottom: "5px",
                  borderBottom: "1px solid #aaa",
                  backgroundColor: user.username === selectedChat ? "#0f766e" : "transparent",
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
    </div>
  );
};

export default Chats;
