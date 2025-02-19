import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

function Main() {
  const [notices, setNotices] = useState([]); // ✅ State to store fetched notices

  // Fetch notices from Flask backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:5000/notices"); // ✅ Flask API URL
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        setNotices(data); // ✅ Store notices in state
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices(); // ✅ Call the function when the component mounts
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Notices</h1>

        {/* ✅ Table to Display Notices */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Filter</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{notice.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{notice.content}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(notice.created_at).toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{notice.filter || "No Tag"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Button to Post a Notice */}
        <div className="text-center mt-6">
          <Link to="/dashboard">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
              Post Your Notice
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
