import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
// Import the context from the index file
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import styles from "./Room.module.css";
import { useWebRTC } from "../hooks/useWebRTC";
import { Context, server } from "../main";

const Channel = () => {
  const { user } = useContext(Context); // Access the user context from Context.Provider
  console.log(user);
  const { id: roomId } = useParams();
  const [room, setRoom] = useState(null);

  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);

  const navigate = useNavigate(); // Using useNavigate instead of useHistory

console.log(clients);
  const [isMuted, setMuted] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(
          `${server}/rooms/${roomId}`,
          { withCredentials: true }
        );
        setRoom(data); // Update the state properly
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    handleMute(isMuted, user.id);
  }, [isMuted]);

  const handManualLeave = () => {
    navigate("/wt");
  };

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) {
      return;
    }
    setMuted((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className={styles.clientsWrap}>
        <div className={styles.header}>
          {room && <h2 className="text-white text-xl">{room.topic}</h2>}
          <div>
            <button onClick={handManualLeave} className="">
              <img src="/images/win.png" alt="win-icon" />
              <span>Leave</span>
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          Users Joined in the Channel
        </h2>
        <ul className="space-y-4">
          {clients.map((client) => {
            return (
              <li
                className="flex items-center border-b-2 border-gray-700 py-2"
                key={client.id}
              >
                <div>
                  <FaRegUserCircle className={styles.userAvatar} size={30} />
                  <audio
                    autoPlay
                    ref={(instance) => {
                      provideRef(instance, client.id);
                    }}
                  />
                  <div className="px-4 py-2">
                  <button
                    onClick={() => handleMuteClick(client.id)}
                    className=""
                  >
                    {client.muted ? (
                      <IoMdMicOff className="text-lime-400 mr-4" size={20} />
                    ) : (
                      <IoMdMic className="text-lime-400 mr-4" size={20} />
                    )}
                  </button>
                  </div>
                </div>
                <h4 className="text-white">{client.name}</h4>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Channel;
