import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import left from "../assets/2.png";  // Imported left image
import right from "../assets/5.png"; // Imported right image
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
    <div
      className="w-100 min-vh-100 flex justify-center items-center"
      style={{
        background: "linear-gradient(135deg,rgb(101, 9, 99),rgb(197, 25, 100),rgb(106, 25, 47))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Left Side - Big Image */}
      <img
        src={left}
        alt="Social Person 1"
        className="absolute left-0"
        style={{ height: "90vh", width: "25%", borderRadius: "20px", objectFit: "cover" ,overflow: "visible"}}
      />

      {/* Stylish Glassmorphic Login Box */}
      <div
        className="w-40 pa4 br4 shadow-5"
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "20px",
          padding: "2.5rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#fff",
        }}
      >
        <h2 className="f1 tc" style={{ textShadow: "2px 2px 10px rgba(0,0,0,0.5)" }}>
          Sign In
        </h2>

        {error && <p className="red tc">{error}</p>}
        {success && (
          <div className="green bg-washed-green pa2 br2 tc">
            ✅ Logged in successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="measure center">
          <div className="mb4">
            <label className="db fw6 lh-copy f5">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pa3 input-reset ba bg-transparent white hover-bg-light-gray w-100 br3"
              required
              style={{
                backdropFilter: "blur(15px)",
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                fontSize: "1rem",
              }}
            />
          </div>

          <div className="mb4">
            <label className="db fw6 lh-copy f5">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pa3 input-reset ba bg-transparent white hover-bg-light-gray w-100 br3"
              required
              style={{
                backdropFilter: "blur(15px)",
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                fontSize: "1rem",
              }}
            />
          </div>

          <button
            type="submit"
            className="b ph3 pv3 input-reset ba b--transparent bg-gradient white grow pointer f5 w-100 br3"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(90deg, #ff8c00, #ff2e63)",
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Sign In
          </button>
        </form>

        <div className="mt4 tc">
          <p className="f5">Don't have an account?</p>
          <button
            onClick={() => navigate("/register")}
            className="white pointer underline bg-transparent bn f5"
            style={{ fontWeight: "bold" }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Right Side - Big Image */}
      <img
        src={right}
        alt="Social Person 2"
        className="absolute right-0"
        style={{ height: "auto", width: "25%", borderRadius: "20px", objectFit: "cover",overflow: "visible" }}
      />
    </div>
  );
}
