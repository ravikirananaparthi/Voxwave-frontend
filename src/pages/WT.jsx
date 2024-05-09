import React, { useState, useEffect } from "react";
//import { io } from "socket.io-client";
import { Link } from "react-router-dom";
//import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import axios from "axios";
import Createroom from "../components/Createroom";
import { server } from "../main";


function WT(props) {
  /*const socket = io("http://localhost:4000", {
    reconnection: true,
  });*/

  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(
          `${server}/rooms/allrooms`,
          { withCredentials: true }
        );
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);
  function openModal() {
    setShowModal(true);
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Public Channels</h2>
          
            <button
              onClick={openModal}
              className="bg-sky-500 hover:bg-sky-600 text-gray-900 rounded-md px-4 py-2 transition duration-300 ease-in-out"
            >
              Create New Room
            </button>
          
        </div>
        <ul className="flex flex-col space-y-4">
          {rooms.map((room) => (
            <li key={room._id} className="bg-gray-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span>{room.topic}</span>
                <Link to={`/room/${room._id}`}>
                  <button className="bg-lime-500 hover:bg-lime-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out">
                    Go to Channel
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {showModal && <Createroom onClose={() => setShowModal(false)} />}
      </div>
      
    </>
  );
}

export default WT;
