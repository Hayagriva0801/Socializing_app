import React, { useState } from "react";
import Navbar from "./navbar";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");

  // Handle posting the notice to the backend
  const handlePostNotice = async () => {
    const noticeData = {
      title,
      content: description,
      created_at: new Date().toISOString(), // Add the current time
      filter,
    };
  
    try {
      // Send the request to Flask backend (localhost:5000)
      const response = await fetch('http://localhost:5000/create_notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noticeData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to post notice');
      }
  
      const data = await response.json();
      console.log('Notice posted successfully:', data);
      alert(`Notice created successfully! Notice ID: ${data.notice_id}`);
    } catch (error) {
      console.error('Error posting notice:', error);
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div>
        <Navbar />
      </div>
      <div className="w-96 p-6 shadow-lg rounded-xl bg-white text-center">
        <h2 className="text-2xl font-semibold">Welcome to Dashboard</h2>
        <p className="mt-4">You have successfully signed in!</p>
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-4 p-2 border border-gray-300 rounded"
        />
        
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-4 p-2 border border-gray-300 rounded"
        />
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-4 p-2 border border-gray-300 rounded"
        >
          <option value="">Select Tags</option>
          <option value="filter1">Sports</option>
          <option value="filter2">Studies</option>
          <option value="filter3">Dance</option>
          {/* Add more filters as needed */}
        </select>
        
        <button
          onClick={handlePostNotice}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post Notice
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
