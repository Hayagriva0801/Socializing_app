import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Chats = () => {
  const [users, setUsers] = useState([]);
  const currentUser = localStorage.getItem("currentUser"); // Logged-in user

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
      <div style={{ width: "30%", backgroundColor: "#111", color: "white", padding: "20px", overflowY: "scroll" }}>
        <h2>Chats</h2>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {users.length > 0 ? (
            users.map((user, index) => (
              user.username !== currentUser && ( // Hide the current user from the list
                <li key={index} style={{ padding: "10px", borderBottom: "1px solid gray" }}>
                  <Link to={`/chat/${user.username}`} style={{ textDecoration: "none", color: "white" }}>
                    <strong>{user.username}</strong>
                  </Link>
                </li>
              )
            ))
          ) : (
            <p>No users available</p>
          )}
        </ul>
      </div>

      {/* Right Side - Placeholder */}
      <div style={{ width: "70%", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h3>Select a chat to start messaging</h3>
      </div>
    </div>
  );
};

export default Chats;
