import React from 'react';
import Canvas from '../components/Canvas';
import Chat from '../components/Chat';
import LobbySidebar from '../components/LobbySidebar';

const GameArina = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('roomId');
    const username = urlParams.get('username') || 'Anonymous';
    const avatar = decodeURIComponent(urlParams.get('avatar') || '../assets/iconsAvatar/luffy.jpg');
    document.title = 'Sketch Verse | Game Arena';
    return (
        <div className="flex flex-col justify-center items-center">
            <LobbySidebar roomId={roomId} />
            <Canvas className={'flex flex-col justify-center items-center align-middle h-screen'} roomId={roomId} username={username} avatar={avatar} />
            <Chat roomId={roomId} username={username} avatar={avatar} />
        </div>
    );
};

export default GameArina;
