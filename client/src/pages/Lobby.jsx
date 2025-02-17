import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import GameCard from "../components/GameCard";

const socket = io("https://sketch-verse.onrender.com"); // Replace with your backend URL

const Lobby = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username") || "Anonymous";
  const avatar = decodeURIComponent(urlParams.get("avatar") || "../assets/iconsAvatar/luffy.jpg");
  
  const [gameId, setGameId] = useState(urlParams.get("roomId"));
  const [players, setPlayers] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    if (!gameId) {
      const newGameId = Math.floor(100000 + Math.random() * 900000);
      setGameId(newGameId);
      setIsCreator(true);
    }
  }, []);

  useEffect(() => {
    console.log(`👑 Checking creator join condition: gameId=${gameId}, isCreator=${isCreator}, socketId=${socketId}`);
    if (gameId && isCreator && socketId) {
        console.log(`Creator joining their own lobby: ${gameId}`);
        socket.emit("join-lobby", { username, avatar, gameId });
    }
}, [gameId, username, avatar, isCreator, socketId]);


  useEffect(() => {
    document.title = "Sketch Verse | Lobby";

    socket.on("connect", () => {
      setSocketId(socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    if (socketId && gameId) {
      console.log(`🚀 Emitting join-lobby: gameId=${gameId}, username=${username}`);
      socket.emit("join-lobby", { username, avatar, gameId });

      socket.on("update-players", (updatedPlayers) => {
        console.log("✅ Received updated players list:", updatedPlayers);
        setPlayers(()=>[...updatedPlayers]); 
      });      

      if (isCreator) {
        setTimeout(() => {
            console.log("🔄 Requesting players list manually...");
            socket.emit("join-lobby", { username, avatar, gameId });
        }, 500);
    }

      return () => {
        socket.emit("leave-isCreatorlobby", { socketId, gameId });
        socket.off("update-players");
      };
    }
  }, [socketId, gameId, username, avatar, isCreator]);

  const createRoom = () => {
    navigate(`/gamearena?&gameId=${gameId}&username=${username}&avatar=${encodeURIComponent(avatar)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">GameID: {gameId}</h1>
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
      {isCreator && (
        <div className="flex justify-center my-5">
          <button
            onClick={createRoom}
            className="text-wrap mb-5 px-8 py-2 font-kota text-xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90"
          >
            Start Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Lobby;
