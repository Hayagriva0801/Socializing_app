import React, { useEffect, useState } from "react";
import Navbar from "./navbar";

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
    <div >
      <Navbar />
      <h1 className="tc f2">Notices</h1>
      
      <div className="flex flex-wrap justify-center">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-light-blue br3 pa3 ma3 shadow-5 w-40"
          >
            <h2 className="f3">{notice.title}</h2>
            <p className="f5">{notice.content}</p>
            <p className="f6 gray">{new Date(notice.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;

