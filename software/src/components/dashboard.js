import React, { useState } from "react";
import Navbar from "./navbar";
import EmojiPicker from "emoji-picker-react"; // ✅ Correct package

function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filters, setFilters] = useState([]);
  const [showTitlePicker, setShowTitlePicker] = useState(false);
  const [showDescPicker, setShowDescPicker] = useState(false);

  const username = localStorage.getItem("currentUser") || "Anonymous";

  const filterOptions = [
    "Sports", "Studies", "Dance", "Music", "Events",
    "Technology", "Workshops", "Health", "Social", "Gaming",
    "Hackathons", "Coding", "Startups", "Internships", "Debates",
    "Public Speaking", "Art", "Photography", "Theater", "Volunteering",
    "Book Club", "Fitness", "Yoga", "Trekking", "Cycling",
    "Swimming", "Football", "Cricket", "Basketball", "Badminton",
    "Table Tennis", "Chess", "Poetry", "Writing", "Film Club",
    "Entrepreneurship", "Investment", "Psychology", "Mindfulness", "Self-Development"
  ];

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.dataset.value;
    if (filters.includes(selectedFilter)) {
      setFilters(filters.filter(f => f !== selectedFilter));
    } else if (filters.length < 3) {
      setFilters([...filters, selectedFilter]);
    } else {
      alert("You can select up to 3 filters.");
    }
  };

  const handlePostNotice = async () => {
    if (!title || !description) {
      alert("Title and description are required!");
      return;
    }

    const noticeData = {
      title,
      content: description,
      created_at: new Date().toISOString(),
      filters: filters.length > 0 ? filters : [],
      username,
    };

    try {
      const response = await fetch("http://localhost:5000/create_notice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticeData),
      });

      if (!response.ok) throw new Error("Failed to post notice");

      alert("Notice created successfully!");
      setTitle("");
      setDescription("");
      setFilters([]);
    } catch (error) {
      console.error("Error posting notice:", error);
    }
  };

  // Function to add emoji to the title
  const addEmojiToTitle = (emoji) => {
    setTitle(title + emoji.emoji); // ✅ Use emoji.emoji
    setShowTitlePicker(false);
  };

  // Function to add emoji to the description
  const addEmojiToDesc = (emoji) => {
    setDescription(description + emoji.emoji);
    setShowDescPicker(false);
  };

  return (
    <div className="w-100 min-vh-100 bg-light-gray">
      <Navbar />

      <div className="flex justify-center items-center mt5">
        <div className="w-40 shadow-5 pa4 bg-white br3">
          <h2 className="f3">Welcome to Dashboard</h2>
          <p className="mt3">You are signed in as <b>{username}</b>!</p>

          {/* Title Input with Emoji Picker */}
          <div className="relative mt3">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pa2 w-100 ba b--black-20 br2"
            />
            <button
              onClick={() => setShowTitlePicker(!showTitlePicker)}
              className="ml2 bg-light-gray pa2 br2 pointer"
            >
              😊
            </button>
            {showTitlePicker && (
              <div className="absolute z-999 mt2">
                <EmojiPicker onEmojiClick={addEmojiToTitle} />
              </div>
            )}
          </div>

          {/* Description Input with Emoji Picker */}
          <div className="relative mt3">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pa2 w-100 ba b--black-20 br2"
            />
            <button
              onClick={() => setShowDescPicker(!showDescPicker)}
              className="ml2 bg-light-gray pa2 br2 pointer"
            >
              😊
            </button>
            {showDescPicker && (
              <div className="absolute z-999 mt2">
                <EmojiPicker onEmojiClick={addEmojiToDesc} />
              </div>
            )}
          </div>

          {/* Multi-select filter */}
          <div className="mt3">
            <label className="db mb2">Select up to 3 tags:</label>
            <div className="flex flex-wrap">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  data-value={option}
                  onClick={handleFilterChange}
                  className={`mr2 mb2 pa2 br2 ${filters.includes(option) ? "bg-blue white" : "bg-light-gray"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

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
