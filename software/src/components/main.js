import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Card from "./card";

function Main() {
  const [notices, setNotices] = useState([]);
  const currentUser = localStorage.getItem("currentUser"); // Retrieve logged-in user
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:5000/notices");
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
  
        console.log("Fetched Notices:", data); // Debugging fetched data
        console.log("Current User:", currentUser); // Debugging current user
  
        // Ensure `username` exists in each notice and matches `currentUser`
        const filteredNotices = data.filter(notice => {
          console.log("Checking Notice:", notice); // Debugging each notice
          return notice.username && notice.username.trim() !== currentUser.trim();
        });
  
        console.log("Filtered Notices (excluding current user):", filteredNotices);
  
        // Sort notices by `created_at` (newest first)
        const sortedNotices = filteredNotices.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
  
        setNotices(sortedNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
  
    fetchNotices();
  }, [currentUser]);
  

  return (
    <div className="min-vh-100 bg-light-yellow">
      <Navbar />
      <h1 className="tc f2">Notices</h1>
      {/* Responsive Grid for Notices */}
      <div
        className="grid gap-4 px-10 my-4"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "20px",
          justifyContent: "center"
        }}
      >
        {notices.map((notice) => (
          <Card
            key={notice._id}
            title={notice.title}
            content={notice.content}
            filters={notice.filters || (notice.filter ? [notice.filter] : [])} // ✅ Handle both cases
            created_at={notice.created_at}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
