import React, { useState } from "react";

import { Link } from "react-router-dom";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("");

  const handlePostNotice = () => {
    console.log("Notice Posted:", { title, description, filter });
    // Here you can add logic to actually post the notice
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
          <option value="">Select Filter</option>
          <option value="filter1">Filter 1</option>
          <option value="filter2">Filter 2</option>
          {/* Add more filters as needed */}
        </select>
        
        <button
          onClick={handlePostNotice}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Post Notice
        </button>

        <Link to="/" className="text-blue-500 mt-4 inline-block">Go back to Login</Link>

      </div>
    </div>
  );
}

export default Dashboard;
