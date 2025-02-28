import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatRoom = () => {
  const { username } = useParams(); // Chat partner's username
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const currentUser = localStorage.getItem("currentUser"); // Logged-in user

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios.get(`http://127.0.0.1:5000/messages/${currentUser}/${username}`)
      .then(response => setMessages(response.data))
      .catch(error => console.error("Error fetching messages:", error));
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    axios.post("http://127.0.0.1:5000/send_message", {
      sender: currentUser,
      receiver: username,
      message: newMessage
    }).then(() => {
      const newMsg = { sender: currentUser, receiver: username, message: newMessage };
      setMessages([...messages, newMsg]); // Add new message to chat
      setNewMessage("");
    }).catch(error => console.error("Error sending message:", error));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Chat List Sidebar */}
      <div style={{ width: "30%", backgroundColor: "#111", color: "white", padding: "20px", overflowY: "scroll" }}>
        <h2>Chats</h2>
        <p>Go back to chats list</p>
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

        {/* Chat Input */}
        <div style={{ padding: "10px", backgroundColor: "#f0f0f0", display: "flex" }}>
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
  );
};

export default ChatRoom;
