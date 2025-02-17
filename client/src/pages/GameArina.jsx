import React from 'react'
import Canvas from '../components/Canvas'
import Chat from '../components/Chat'

const GameArina = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId=urlParams.get("roomId")
  const username = urlParams.get("username") || "Anonymous";
  const avatar = decodeURIComponent(urlParams.get("avatar") || "../assets/iconsAvatar/luffy.jpg");
  console.log("Coming");
  document.title = 'Sketch Verse | Game Arena';
  return (
    <div>
      <>
       <Canvas roomId={roomId} username={username} avatar={avatar}/>
       <Chat  roomId={roomId} username={username} avatar={avatar}/>
      </>
    </div>
  )
}

export default GameArina
