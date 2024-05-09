import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";

function AudioRoom() {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const [peer, setPeer] = useState(null);
  const [currentStream, setCurrentStream] = useState(null);
  const audioRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    // Initialize Socket.IO
    socketRef.current = io(`${import.meta.env.server}`); // Replace with your server URL

    // Initialize PeerJS
    const initializePeer = async () => {
      const newPeer = new Peer(undefined, {
        host: "/", // Your PeerJS server host
        port: "4000", // Your PeerJS server port
        path: "/peerjs",
      });

      setPeer(newPeer);

      // Get user media
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setCurrentStream(stream);
          // Join room and send user details to backend
          socketRef.current.emit("joinRoom", { roomId });
          
          // Listen for new users joining
          socketRef.current.on("userJoined", ({ userId }) => {
            connectToNewUser(userId, stream);
          });
        })
        .catch((err) => console.error("Error accessing microphone:", err));
    };

    initializePeer();

    return () => {
      if (peer) {
        peer.disconnect();
        peer.destroy();
      }
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const connectToNewUser = (userId, stream) => {
    // Call user
    const call = peer.call(userId, stream);
    // Answer call
    call.answer(stream);
    // Add user to users state
    setUsers((prevUsers) => [...prevUsers, userId]);

    // Listen for stream
    call.on("stream", (userStream) => {
      // Play remote stream
      audioRef.current.srcObject = userStream;
    });

    // Handle user leaving
    call.on("close", () => {
      setUsers((prevUsers) => prevUsers.filter((user) => user !== userId));
    });
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
      <audio ref={audioRef} autoPlay />
    </div>
  );
}

export default AudioRoom;
