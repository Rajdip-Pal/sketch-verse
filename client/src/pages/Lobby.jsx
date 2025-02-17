import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import GameCard from "../components/GameCard";

const socket = io("http://localhost:5000"); // Replace with your backend URL
const gameId = Math.floor(100000 + Math.random() * 900000); // Random 6-digit game ID

const Lobby = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username") || "Anonymous";
  const avatar = decodeURIComponent(urlParams.get("avatar") || "../assets/iconsAvatar/luffy.jpg");

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    document.title = "Sketch Verse | Lobby";

    // Join the lobby and send user data
    socket.emit("join-lobby", { username, avatar });

    // Receive updated players list
    socket.on("update-players", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.off("update-players");
    };
  }, []);

  const createRoom = () => {
    navigate(`/gamearena?roomId=${gameId}&username=${username}&avatar=${encodeURIComponent(avatar)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">GameID:{gameId}</h1>
      <div className="w-80 p-4 bg-gray-800 rounded-2xl shadow-lg">
        {players.map((player, index) => (
          <GameCard
            key={index}
            className="mb-2"
            image={player.avatar}
            photoWidth={80}
            photoHeight={80}
            userName={player.username}
            usersPoints={0}
          />
        ))}
      </div>
      <div className="flex justify-center my-5">
        <button
          onClick={createRoom}
          className="text-wrap mb-5 px-8 py-2 font-kota text-xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Lobby;