import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard"; // Import the new page
import Main from "./components/main"; // Import the Main component
import Chats from "./components/chats"; // Import the Chats component
import "./styles/App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/main" element={<Main />} /> 
        <Route path="/chats" element={<Chats />} />
      </Routes>

    </Router>
  );
}

export default App;
