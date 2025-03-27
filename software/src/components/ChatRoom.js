import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import Navbar from "./navbar";

const ChatRoom = () => {
  const { username } = useParams(); // Chat partner's username
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [users, setUsers] = useState([]); // Store all users

  const currentUser = localStorage.getItem("currentUser"); // Logged-in user

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Auto-refresh every 2s

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [username]); // Runs every time username changes

  const fetchMessages = () => {
    axios.get(`http://127.0.0.1:5000/messages/${currentUser}/${username}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error("Error fetching messages:", error));
  };

  const fetchUsers = () => {
    axios.get("http://127.0.0.1:5000/all_users") // Fetch all users
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error("Error fetching users:", error));
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    axios.post("http://127.0.0.1:5000/send_message", {
      sender: currentUser,
      receiver: username,
      message: newMessage
    }).then(() => {
      fetchMessages(); // Ensure latest messages appear
      setNewMessage("");
    }).catch(error => console.error("Error sending message:", error));
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar (Now above everything) */}
      <Navbar />

      {/* Chat Layout */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar - Users List */}
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
                user.username !== currentUser && user.username !== username && ( 
                  <li key={index} style={{ 
                    padding: "12px", 
                    marginBottom: "5px",
                    borderBottom: "1px solid #aaa",
                    backgroundColor: user.username === username ? "#0f766e" : "transparent",
                    cursor: "pointer",
                    borderRadius: "8px"
                  }}>
                    <Link 
                      to={`/chat/${user.username}`} 
                      onClick={() => setMessages([])} // Reset messages on switch
                      style={{ textDecoration: "none", color: "white", fontWeight: "bold", display: "block" }}
                    >
                      {user.username}
                    </Link>
                  </li>
                )
              ))
            ) : (
              <p>No other users available</p>
            )}
          </ul>
        </div>

        {/* Chat Window */}
        <div style={{ width: "70%", backgroundColor: "#f0f0f0", display: "flex", flexDirection: "column" }}>
          <div style={{ backgroundColor: "#075e54", color: "white", padding: "10px" }}>
            <h2>{username}</h2>
          </div>

          {/* Chat Messages */}
          <div style={{ flexGrow: 1, padding: "20px", overflowY: "scroll", backgroundColor: "#e5ddd5" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                textAlign: msg.sender === currentUser ? "right" : "left",
                marginBottom: "10px"
              }}>
                <span style={{
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: msg.sender === currentUser ? "#dcf8c6" : "#fff",
                  maxWidth: "60%"
                }}>
                  <strong>{msg.sender === currentUser ? "You" : msg.sender}:</strong> {msg.message}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input & Emoji Picker */}
          <div style={{ padding: "10px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center" }}>
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              style={{ padding: "10px", backgroundColor: "#128c7e", color: "white", borderRadius: "10px", marginRight: "10px" }}
            >
              😊
            </button>

            {showEmojiPicker && (
              <div style={{ position: "absolute", bottom: "60px", left: "40%" }}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            <input 
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #ccc" }}
            />
            <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px", backgroundColor: "#128c7e", color: "white", borderRadius: "10px" }}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ChatRoom;
