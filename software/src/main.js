import React from "react";
import { Link } from "react-router-dom";

function main() {
  const notices = [
    { id: 1, title: "Notice 1", description: "Description for notice 1" },
    { id: 2, title: "Notice 2", description: "Description for notice 2" },
  ];

  return (
    <div>
      <h1>Notices</h1>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id}>
            <h2>{notice.title}</h2>
            <p>{notice.description}</p>
          </li>
        ))}
      </ul>
      
      <Link to="/dashboard">
        <button>Post Your Notice</button>
      </Link>
    </div>
  );
}

export default main;
