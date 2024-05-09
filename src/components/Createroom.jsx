import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SiSocialblade } from "react-icons/si";
import { FaLockOpen } from "react-icons/fa";
import { IoLockClosed } from "react-icons/io5";

const Createroom = ({ onClose }) => {
  const navigate = useNavigate();

  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  const handleTypeSelect = (type) => {
    setRoomType(type);
  };

  async function createRoom() {
    try {
      if (!topic) return;
      const { data } = await axios.post(
        `${server}/rooms/createroom`,
        { topic, roomType },
        { withCredentials: true }
      );
      navigate(`/room/${data._id}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <button onClick={onClose} className="absolute top-0 right-0 mt-2 mr-2">
          <img src="/images/close.png" alt="close" />
        </button>
        <h3 className="text-xl font-semibold mb-4">
          Enter the topic to be discussed
        </h3>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full text-black focus:outline-none focus:border-blue-500"
          placeholder="Topic"
        />
        <h2 className="text-lg font-semibold mb-2">Room types</h2>
        <div className="flex mb-4">
          <div
            className={`mr-4 cursor-pointer text-sky-500`}
            onClick={() => setRoomType("open")}
          >
            <FaLockOpen className="w-8 h-8" />
            <span className="ml-2">Open</span>
          </div>
          <div
            className={`mr-4 cursor-pointer text-lime-500`}
            onClick={() => setRoomType("social")}
          >
            <SiSocialblade className="w-8 h-8" />
            <span className="ml-2">Social</span>
          </div>
          <div
            className={`cursor-pointer text-blue-500 `}
            onClick={() => setRoomType("private")}
          >
            <IoLockClosed className="w-8 h-8" />
            <span className="ml-2">Private</span>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={createRoom}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-md px-4 py-2"
          >
            <span className="ml-2">Let's go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createroom;
