import React, { useState } from "react";
import logo from "/reuse-water.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { KeyRound, Mail } from "lucide-react";

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
    <div className="w-screen h-screen flex flex-col  md:p-10">
      <div className="flex flex-col h-50 w-full items-center">
        <p
          className=" md:flex text-4xl lg:text-6xl  text-center text-[#84b0d3]
      mt-8 font-bold font-bungee word-spacing-sm md:word-spacing"
        >
          WELCOME TO WA
          <span className=" text-5xl lg:text-7xl text-[#13325b]">T</span>RACK
        </p>
        <p className=" font-outfit text-[#66859f] hidden md:block text-base lg:text-xl">
          An easy-to-use application to track your daily water usage.
        </p>
      </div>
      <div
        className="w-full h-full flex flex-row gap-4 items-center justify-center font-outfit"
        id="form-container"
      >
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-10 h-full lg:h-[50%] w-full max-w-125 justify-center lg:mb-8"
        >
          <p className="w-[80@] h20 md:h-40 mb-20 mr-10 lg:mb-6 flex items-center justify-center gap-6 text-3xl md:text-4xl text-[#355d8b]">
            <img src={logo} className="size-15" /> Log In
          </p>
          <span className="w-full border border-b-[#223857] border-x-0 border-t-0 py-3 px-2 flex flex-row items-center">
            <Mail size={33} className="mr-4 text-[#355d8b]" />
            <input
              type="text"
              placeholder="enter your email.."
              value={email}
              className="outline-0  w-full placeholder-[#62666b] text-blue-400 text-lg "
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
          <span className="w-full border border-b-[#223857] border-x-0 border-t-0 p-4 pl-2 mt-6 flex flex-row items-center">
            <KeyRound size={33} className="mr-4 text-[#355d8b]" />
            <input
              type="password"
              placeholder="enter your password.."
              value={password}
              className="outline-0 w-full placeholder-[#62666b] text-blue-400 text-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
          <button
            type="submit"
            className="bg-[#355d8b] w-full rounded-4xl p-4 text-xl cursor-pointer
            transition-all duration-200 ease-in-out hover:bg-blue-400 active:scale-95 active:bg-blue-500 "
          >
            Login
          </button>
          {error && <p className="text-red-300 text-lg">{error}!</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
