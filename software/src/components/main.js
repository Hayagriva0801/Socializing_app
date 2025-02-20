import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Card from "./card"; // ✅ Import Card Component

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
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="tc f2">Notices</h1>

      <div className="flex flex-wrap justify-center">
        {notices.map((notice) => (
          <Card
            key={notice._id}
            title={notice.title}
            content={notice.content}
            filter={notice.filter || []}
            created_at={notice.created_at}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;

