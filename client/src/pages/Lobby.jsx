import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import GameCard from '../components/GameCard';

const socket = io("https://sketch-verse.onrender.com", { transports: ["websocket"] }); // Replace with your backend URL

const Lobby = () => {
    const navigate = useNavigate();

    // Parse the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username') || 'Anonymous'; // Default to 'Anonymous' if no username is provided
    const avatar = decodeURIComponent(urlParams.get('avatar')) || '../assets/iconsAvatar/luffy.jpg'; // Default avatar if not provided
    const initialGameId = urlParams.get('roomId') || null; // Get the roomId if available

    // State variables for gameId, players list, creator status, and socket ID
    const [gameId, setGameId] = useState(initialGameId);
    const [players, setPlayers] = useState([]);
    const [isCreator, setIsCreator] = useState(false);
    const [socketId, setSocketId] = useState(null);

    // Effect to generate a new gameId if it's not provided in the URL
    useEffect(() => {
        if (!gameId) {
            // Generate a random 6-digit game ID if one doesn't exist
            const newGameId = Math.floor(100000 + Math.random() * 900000);
            setGameId(newGameId); // Set the newly generated gameId
            setIsCreator(true); // Mark as the creator of the game
        }
    }, [gameId]); // This effect runs only when gameId is initially undefined

    // Effect to handle joining the lobby for both creator and players
    useEffect(() => {
        if (gameId && socketId) {
            console.log(`🚀 Joining lobby: gameId=${gameId}, username=${username}`);
            // Emit a 'join-lobby' event with player details to the server
            socket.emit('join-lobby', { username, avatar, gameId });

            // Listen for 'update-players' event to update the player list
            socket.on('update-players', updatedPlayers => {
                console.log('✅ Players list updated:', updatedPlayers);
                setPlayers(updatedPlayers); // Update the player list in the state
            });

            // Cleanup function to leave the lobby and remove listeners
            return () => {
                socket.emit('leave-lobby', { socketId, gameId });
                socket.off('update-players'); // Remove the 'update-players' event listener
            };
        }
    }, [socketId, gameId, username, avatar]); // Dependencies: socketId, gameId, username, avatar

    // Effect to handle socket connection and set the socket ID
    useEffect(() => {
        socket.on('connect', () => {
            setSocketId(socket.id); // Set the socket ID when the connection is established
        });

        // Cleanup function to remove the 'connect' event listener when the component is unmounted
        return () => {
            socket.off('connect');
        };
    }, []); // Empty dependency array to run this effect once on mount

    // Function to navigate to the game arena page with necessary parameters
    const createRoom = useCallback(() => {
        navigate(`/gamearena?gameId=${gameId}&username=${username}&avatar=${encodeURIComponent(avatar)}`);
    }, [gameId, username, avatar, navigate]); // Callback dependency to ensure the values are up to date

    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-4">GameID: {gameId}</h1>
            <div className="w-80 p-4 bg-gray-800 rounded-2xl shadow-lg">
                {/* Map through players and render their game cards */}
                {players.map((player, index) => (
                    <GameCard key={index} className="mb-2" image={player.avatar} photoWidth={80} photoHeight={80} userName={player.username} usersPoints={0} />
                ))}
            </div>

            {/* Show "Start Game" button only if the current user is the creator */}
            {isCreator && (
                <div className="flex justify-center my-5">
                    <button
                        onClick={createRoom} // Trigger the navigation to game arena when clicked
                        className="text-wrap mb-5 px-8 py-2 font-kota text-xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90">
                        Start Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default Lobby;
