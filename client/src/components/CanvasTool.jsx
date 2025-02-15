import React from "react";
import eraser from '../assets/images/eraser.png';
import pencil from '../assets/images/pencil.png';
import Undo from '../assets/images/undo.png';
import Redo from '../assets/images/redo.png';
import reset from '../assets/images/reset.png';


const CanvasTool = ({ tool, setTool, penColor, setPenColor, penWidth, setPenWidth, undo, redo, resetCanvas }) => {
  return (
    <div className="absolute mt-5 top-2 flex gap-3 bg-lime-500 p-2 rounded-lg shadow-md">
      <button 
      title="Pen"
        onClick={() => setTool("pen")} 
        className={`px-3 py-1 rounded ${tool === "pen" ? "bg-lime-600" : ""} active:scale-90 `}
      >
        <img src={pencil} alt="pencil" className="w-6 h-6" />
      </button>
      <button 
        title="eraser"
        onClick={() => setTool("eraser")} 
        className={`px-3 py-1 rounded ${tool === "eraser" ? "bg-lime-600" : ""} active:scale-90 `}
      >
        <img src={eraser} alt="eraser" className="w-6 h-6" />
      </button>
      <input
        title="color"
        type="color"
        value={penColor}
        onChange={(e) => setPenColor(e.target.value)}
        className="cursor-pointer rounded-full w-12 h-12 border-none p-0 appearance-none bg-transparent"
      />
      <input 
        type="range" 
        min="1" 
        max="20" 
        value={penWidth} 
        onChange={(e) => setPenWidth(e.target.value)} 
        className="cursor-pointer"
      />
      <button title="undo" onClick={undo} className="px-3 py-1 active:scale-90 rounded">
        <img src={Undo} alt="undo" className="w-6 h-6" />
      </button>
      <button title="redo" onClick={redo} className="px-3 py-1 active:scale-90 rounded">
        <img src={Redo} alt="redo" className="w-6 h-6" />
      </button>
      <button title="Reset" onClick={resetCanvas} className="px-3 py-1 active:scale-90  rounded">
        <img src={reset} alt="result" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CanvasTool;
