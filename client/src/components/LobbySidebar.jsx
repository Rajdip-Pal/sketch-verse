import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";

const LobbySidebar = ({ roomId }) => {
  const [players, setPlayers] = useState([
    { name: "Host_Player", avatar: "../assets/iconsAvatar/luffy.jpg", points: 10 },
    { name: "Alice", avatar: "../assets/iconsAvatar/zoro.jpeg", points: 8 },
    { name: "Bob", avatar: "../assets/iconsAvatar/sanji.jpg", points: 6 },
    { name: "Charlie", avatar: "../assets/iconsAvatar/nami.jpg", points: 4 },
    { name: "David", avatar: "../assets/iconsAvatar/chopper.jpeg", points: 2 }
  ]);

  useEffect(() => {
    // Simulate real-time updates (e.g., fetching from a WebSocket or API)
    const interval = setInterval(() => {
      setPlayers(prevPlayers => prevPlayers.map(player => ({
        ...player,
        points: player.points + Math.floor(Math.random() * 3) // Simulating points update
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-64 p-4 bg-gray-800 text-white rounded-r-xl shadow-lg h-full fixed left-0 top-0 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center">Lobby</h2>
      <p className="text-center text-sm text-gray-400">Room ID: {roomId}</p>
      <div className="flex flex-col gap-3 mt-4 overflow-y-auto">
        {players.map((player, index) => (
          <GameCard 
            key={index} 
            className="mb-2" 
            image={player.avatar} 
            photoWidth={50} 
            photoHeight={50} 
            userName={player.name} 
            usersPoints={player.points} 
          />
        ))}
      </div>
    </div>
  );
};

export default LobbySidebar;
