import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard"; // Import the new page
import Main from "./components/main"; // Import the Main component
import Chats from "./components/chats"; // Import the Chats component
import ChatRoom from "./components/ChatRoom";

import "./styles/App.css"
import Register from "./components/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/main" element={<Main />} /> 
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:username" element={<ChatRoom />} />
      </Routes>

    </Router>
  );
}

export default App;
