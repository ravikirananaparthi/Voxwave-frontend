import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { Context, auth, server } from "../main";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import axios from "axios";

export default function Nav() {
  const { isAuthenticated, user, setLoader, setAuth } = useContext(Context);

  const [nav, setNav] = useState(false);

  const logOutHandler = async () => {
    setLoader(true);
    try {
      await signOut(auth);
      const response = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfully");
      setAuth(false);
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = "";
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed"); // Handle potential errors
    } finally {
      setLoader(false);
    }
  };
  return (
    <header className="bg-black py-4 px-6 md:px-8 lg:px-10 flex justify-between items-center ">
      <div className="flex items-center">
        <MicIcon className="h-6 w-6 text-white mr-4 " />
        <span className="text-white font-medium text-lg hover:text-gray-400 transition-colors duration-300 ml-3">
          Voxwave
        </span>
      </div>
      <div className="hidden md:flex space-x-6 text-white">
        <Link
          to={"/app/wt"}
          className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800"
          href="#"
        >
          Audio Channels
        </Link>
        <Link
          to={"/app/fm"}
          className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800"
          href="#"
        >
          FM Radio Stations
        </Link>
        <Link
          onClick={logOutHandler}
          to={"/app/login"}
          className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-red-800"
          href="#"
        >
          Logout
        </Link>
        <div className="flex items-center">
          {isAuthenticated && (
            <Link to="/app/profile" className="">
              {user?.image ? (
                <img
                  src={user.image}
                  className="rounded-full object-cover "
                  alt="User Profile"
                  style={{ width: "35px", height: "35px" }}
                />
              ) : (
                <FaUserCircle className="icon" size={35} />
              )}
            </Link>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <div className="relative">
          <Button
            onClick={() => setNav(!nav)}
            className="text-gray-400 hover:text-white transition-colors duration-300"
            size="icon"
            variant="ghost"
          >
            <MenuIcon className="h-6 w-6  text-white rounded-lg  " />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <div
            className={
              nav
                ? "fixed top-0 left-0 w-[300px] h-screen bg-black z-20 duration-300"
                : "fixed top-0 left-[-100%] w-300 h-screen bg-white z-20 duration-300"
            }
          >
            <IoMdClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute text-white right-4 top-4 cursor-pointer mt-2"
            />
            <div className="flex items-center p-4 ml-4 mt-3">
              <MicIcon className="h-6 w-6 text-white mr-4 " />
              <span className="text-white font-medium text-lg hover:text-gray-400 transition-colors duration-300 ml-3">
                Voxwave
              </span>
            </div>{" "}
            <nav>
              <ul className="flex flex-col p-4 text-white">
                <div
                  className="flex items-center text-xl py-4  "
                  onClick={() => setNav(!nav)}
                >
                  {isAuthenticated && (
                    <Link to="/app/profile" className="flex flex-row">
                      {user?.image ? (
                        <img
                          src={user?.image}
                          className="rounded-full object-cover "
                          alt="User Profile"
                          style={{ width: "35px", height: "35px" }}
                        />
                      ) : (
                        <FaUserCircle className="icon" size={35} />
                      )}
                      <p className="text-gray-400 hover:text-white transition-colors duration-300 text-xl p-2 flex ">
                        {user?.name}
                      </p>
                    </Link>
                  )}
                </div>
                <Link to={"/app/wt"} onClick={() => setNav(!nav)}>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-xl py-4 flex ">
                    Audio Channels
                  </li>
                </Link>
                <Link to={"/app/fm"} onClick={() => setNav(!nav)}>
                  <li className="text-gray-400 hover:text-white transition-colors duration-300 text-xl py-4 flex ">
                    FM Radio Stations
                  </li>
                </Link>
                <Link
                  to={"/"}
                  onClick={() => {
                    logOutHandler;
                    setNav(!nav);
                  }}
                >
                  <li className="text-gray-400 hover:text-red-800 transition-colors duration-300 text-xl py-4 flex ">
                    Logout
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
function MicIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow)">
        <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
      </g>
    </svg>
  );
}
