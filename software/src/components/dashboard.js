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

    console.log(filter);
    try {
      const response = await fetch("http://localhost:5000/create_notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noticeData),
      });

      if (!response.ok) {
        throw new Error("Failed to post notice");
      }

      const data = await response.json();
      console.log("Notice posted successfully:", data);
      alert(`Notice created successfully! Notice ID: ${data.notice_id}`);
    } catch (error) {
      console.error("Error posting notice:", error);
    }
  };

  return (
    <div className="w-100 min-vh-100 bg-light-gray">
      {/* ✅ Navbar Stays at the Top */}
      <Navbar />

      {/* ✅ Centered Notice Form */}
      <div className="flex justify-center items-center mt5">
        <div className="w-40 shadow-5 pa4 bg-white br3">
          <h2 className="f3">Welcome to Dashboard</h2>
          <p className="mt3">You have successfully signed in!</p>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt3 pa2 w-100 ba b--black-20 br2"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt3 pa2 w-100 ba b--black-20 br2"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt3 pa2 w-100 ba b--black-20 br2"
          >
            <option value="">Select Tags</option>
            <option value="Sports">Sports</option>
            <option value="Studies">Studies</option>
            <option value="Dance">Dance</option>
          </select>

          <button
            onClick={handlePostNotice}
            className="mt3 w-100 pa2 bg-blue white br2 grow pointer"
          >
            Post Notice
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
