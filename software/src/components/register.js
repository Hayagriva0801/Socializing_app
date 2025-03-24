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
    <div
      className="flex justify-center items-center min-vh-100"
      style={{
        background: "linear-gradient(120deg, #ff4e50, #f9d423)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        className="br3 pa4 shadow-5"
        style={{
          backgroundColor: "white",
          minWidth: "350px",
          maxWidth: "400px",
          width: "100%",
          borderRadius: "15px",
          padding: "40px",
        }}
      >
        <h2 className="tc f2 mb4">Sign Up</h2>

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
              className="pa3 input-reset ba b--black-20 w-100 br2"
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
              className="pa3 input-reset ba b--black-20 w-100 br2"
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
              className="pa3 input-reset ba b--black-20 w-100 br2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-100 ph3 pv2 input-reset ba b--transparent bg-dark-red white br2 grow pointer f5"
          >
            Sign Up
          </button>
        </form>

        <div className="mt4 tc">
          <p className="f6">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="pointer underline bg-transparent bn dark-blue f6"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
