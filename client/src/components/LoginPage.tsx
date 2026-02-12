import React, { useState } from "react";
import logo from "../assets/reuse-water.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<number | string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const URL = "http://localhost:5500/api/auth/login";
      const response = await axios.post(URL, { email, password });
      console.log(response.data);

      if (response.data.authenticated === true) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError("Invalid email or password");
      console.log(error);
    }
    console.log("login triggered");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div
        className="w-full md:w-130 h-full md:h-150 border border-cyan-500 rounded-4xl flex flex-col items-center gap-8"
        id="form-container"
      >
        <img src={logo} alt="Water Tracker logo" className="size-20" />
        <form
          onSubmit={handleLogin}
          className="flex flex-col  items-center justify-center"
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
