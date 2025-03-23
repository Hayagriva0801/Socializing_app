import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "tachyons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/main");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { username } = response.data;
        if (!username) {
          throw new Error("Username missing from server response!");
        }

        localStorage.setItem("currentUser", username);
        localStorage.setItem("userEmail", email);

        setSuccess(true);
        setTimeout(() => navigate("/main"), 2000);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Invalid email or password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-vh-100 bg-light-red">
      <div className="w-100 mw6 pa4 shadow-5 br3 bg-white">
        <h2 className="f2 tc">Sign In</h2>

        {error && <p className="red tc">{error}</p>}
        {success && (
          <div className="green bg-washed-green pa2 br2 tc">
            ✅ Logged in successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="measure center">
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
            Sign In
          </button>
        </form>

        <div className="mt3 tc">
          <p className="f6">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="blue pointer underline bg-transparent bn f6"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
