import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard"; // Import the new page
import Main from "./main"; // Import the Main component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/main" element={<Main />} /> 
      </Routes>

    </Router>
  );
}

export default App;
