import React from 'react'
import Canvas from '../components/Canvas'
import Chat from '../components/Chat'

const GameArina = () => {
  document.title = 'Sketch Verse | Game Arena';
  return (
    <div>
      <>
       <Canvas />
       <Chat />
      </>
    </div>
  )
}

export default GameArina
