import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg rounded-xl bg-white text-center">
        <h2 className="text-2xl font-semibold">Welcome to Dashboard</h2>
        <p className="mt-4">You have successfully signed in!</p>
        <Link to="/" className="text-blue-500 mt-4 inline-block">Go back to Login</Link>
      </div>
    </div>
  );
}

export default Dashboard;
