import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link component
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  // Define state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Update email state
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Update password state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { isAuthenticated, setAuth, loader, setLoader } = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setAuth(true);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoader(false);
      setAuth(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/wt"} />;
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter Email"
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full md:w-96 focus:outline-none focus:ring focus:border-lime-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter Password"
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full md:w-96 focus:outline-none focus:ring focus:border-lime-400"
            />
            <div className="mt-2">
              <input
                type="checkbox"
                id="showPassword"
                className="mr-2"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="showPassword" className="text-gray-400">
                Show Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-md px-4 py-2 w-full md:w-96 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-400 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-lime-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
