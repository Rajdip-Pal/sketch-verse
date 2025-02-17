import React from "react";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";

const gameId = Math.floor(100000 + Math.random() * 900000); // Random 6-digit game ID
const players = [
  { name: "Alice", avatar: "../assets/iconsAvatar/zoro.jpeg" },
  { name: "Bob", avatar: "../assets/iconsAvatar/sanji.jpg" },
  { name: "Charlie", avatar: "../assets/iconsAvatar/nami.jpg" },
  { name: "Jack", avatar: "../assets/iconsAvatar/akainu.jpg" }
];

const Lobby = () => {
  const navigate=useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username") || "Anonymous";
  const avatar = decodeURIComponent(urlParams.get("avatar") || "../assets/iconsAvatar/luffy.jpg");

  const host = { name: username, avatar };

  const createRoom = () => {
    navigate(`/gamearena?roomId=${gameId}&username=${username}&avatar=${encodeURIComponent(avatar)}`);
  };

    React.useEffect(() => {
        document.title = 'Sketch Verse | Lobby';
    }, []);
  return (
    <>
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Game ID: {gameId}</h1>
      <div className="w-80 p-4 bg-gray-800 rounded-2xl shadow-lg">
        <GameCard className="mb-2" image={host.avatar} photoWidth={80} photoHeight={80} userName={`${host.name} (Host)`} usersPoints={0} />
        {players.map((player, index) => (
          <GameCard key={index} className="mb-2" image={player.avatar} photoWidth={80} photoHeight={80} userName={player.name} usersPoints={0} />
        ))}
      </div>
      <div className="flex justify-center my-5 ">
        <div className="text-center m-1">
          <button onClick={createRoom} className="text-wrap mb-5 px-8 py-2 font-kota text-xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90">
            Start Game
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Lobby;
