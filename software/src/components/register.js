import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "tachyons";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !username) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        email,
        username,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem("userEmail", email);
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => navigate("/build-profile"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-vh-100 bg-light-red">
      <div className="w-100 mw6 pa4 shadow-5 br3 bg-white">
        <h2 className="f2 tc">Sign Up</h2>
        {error && <p className="red tc">{error}</p>}
        {success && <p className="green tc">{success}</p>}
        <form onSubmit={handleSubmit} className="measure center">
          <div className="mb3">
            <label className="db fw6 lh-copy f6">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pa2 input-reset ba bg-transparent hover-bg-light-gray w-100"
              required
            />
          </div>
          <div className="mb3">
            <label className="db fw6 lh-copy f6">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pa2 input-reset ba bg-transparent hover-bg-light-gray w-100"
              required
            />
          </div>
          <div className="mb3">
            <label className="db fw6 lh-copy f6">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pa2 input-reset ba bg-transparent hover-bg-light-gray w-100"
              required
            />
          </div>
          <button
            type="submit"
            className="b ph3 pv2 input-reset ba b--black bg-blue white grow pointer f6"
          >
            Sign Up
          </button>
        </form>
        <div className="mt3 tc">
          <p className="f6">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="blue pointer underline bg-transparent bn f6"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}