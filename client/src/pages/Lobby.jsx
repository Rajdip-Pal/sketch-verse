import React from "react";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";

const gameId = Math.floor(100000 + Math.random() * 900000); // Random 6-digit game ID
const host = { name: "Host_Player", avatar: "../assets/iconsAvatar/luffy.jpg" };
const players = [
  { name: "Alice", avatar: "../assets/iconsAvatar/zoro.jpeg" },
  { name: "Bob", avatar: "../assets/iconsAvatar/sanji.jpg" },
  { name: "Charlie", avatar: "../assets/iconsAvatar/nami.jpg" },
  { name: "David", avatar: "../assets/iconsAvatar/chopper.jpeg" },
  { name: "Eve", avatar: "../assets/iconsAvatar/Robin.jpg" },
  { name: "Frank", avatar: "../assets/iconsAvatar/Roger.jpg" },
  { name: "Grace", avatar: "../assets/iconsAvatar/Whitebeard.jpg" },
  { name: "Hank", avatar: "../assets/iconsAvatar/ace.jpeg" },
  { name: "Ivy", avatar: "../assets/iconsAvatar/shanks.jpeg" },
  { name: "Jack", avatar: "../assets/iconsAvatar/akainu.jpg" }
];

const Lobby = () => {

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
        <Link to="/gamearena" className="text-center m-1">
          <button className="text-wrap mb-5 px-8 py-2 font-kota text-xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90">
            Start Game
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Lobby;
