import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

// Import avatar images
import luffy from '../assets/iconsAvatar/luffy.jpg';
import zoro from '../assets/iconsAvatar/zoro.jpeg';
import sanji from '../assets/iconsAvatar/sanji.jpg';
import nami from '../assets/iconsAvatar/nami.jpg';
import chopper from '../assets/iconsAvatar/chopper.jpeg';

// LobbySidebar component displays the list of players in the lobby with their avatars and points.
const LobbySidebar = ({ roomId }) => {
    // State to store players' information.
    const [players, setPlayers] = useState([
        { name: 'Host_Player', avatar: luffy, points: 10 },
        { name: 'Alice', avatar: zoro, points: 8 },
        { name: 'Bob', avatar: sanji, points: 6 },
        { name: 'Charlie', avatar: nami, points: 4 },
        { name: 'David', avatar: chopper, points: 2 },
    ]);

    useEffect(() => {
        // Simulate real-time updates for players' points using a setInterval.
        const interval = setInterval(() => {
            setPlayers(prevPlayers =>
                prevPlayers.map(player => ({
                    ...player,
                    points: player.points + Math.floor(Math.random() * 3), // Simulated points update.
                })),
            );
        }, 5000); // Updates every 5 seconds.

        return () => clearInterval(interval); // Cleanup interval on component unmount.
    }, []);

    return (
        // Sidebar container with styling and scrollable player list.
        <div className="w-[20%] p-4 bg-gray-800 text-white rounded-r-xl shadow-lg h-full fixed left-0 top-0 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Lobby</h2>
            <p className="text-center text-sm text-gray-400">Room ID: {roomId}</p>
            <div className="flex flex-col gap-3 mt-4 overflow-y-auto">
                {players.map((player, index) => (
                    <GameCard key={index} className="m-2" image={player.avatar} photoWidth={100} userName={player.name} usersPoints={player.points} />
                ))}
            </div>
        </div>
    );
};

export default LobbySidebar;
