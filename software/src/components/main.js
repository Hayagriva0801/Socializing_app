import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Card from "./card";

function Main() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:5000/notices");
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        
        // Sort notices by `created_at` (newest first)
        const sortedNotices = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        
        setNotices(sortedNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
  
    fetchNotices();
  }, []);
  

  return (
    <div className="min-vh-100 bg-light-yellow">
      <Navbar />
      <h1 className="tc f2">Notices</h1>
      {/* Responsive Grid for Notices */}
      <div className="grid gap-4 px-10 my-4"
     style={{ 
       display: "grid", 
       gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", // Responsive 1 or 2 per row
       gap: "20px",
       justifyContent: "center"
     }}>
  {notices.map((notice) => (
    <Card
      key={notice._id}
      title={notice.title}
      content={notice.content}
      filter={notice.filter}
      created_at={notice.created_at}
    />
  ))}
</div>

      </div>

  );
}

export default Main;

