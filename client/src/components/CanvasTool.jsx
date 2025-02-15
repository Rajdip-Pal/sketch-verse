import React from "react";

const CanvasTool = ({ tool, setTool, penColor, setPenColor, penWidth, setPenWidth, undo, redo, resetCanvas }) => {
  return (
    <div className="absolute top-2 flex gap-3 bg-gray-200 p-2 rounded-lg shadow-md">
      <button 
        onClick={() => setTool("pen")} 
        className={`px-3 py-1 rounded ${tool === "pen" ? "bg-blue-700" : "bg-blue-500"} text-white`}
      >
        Pen
      </button>
      <button 
        onClick={() => setTool("eraser")} 
        className={`px-3 py-1 rounded ${tool === "eraser" ? "bg-gray-700" : "bg-gray-500"} text-white`}
      >
        Eraser
      </button>
      <input 
        type="color" 
        value={penColor} 
        onChange={(e) => setPenColor(e.target.value)} 
        className="cursor-pointer"
      />
      <input 
        type="range" 
        min="1" 
        max="20" 
        value={penWidth} 
        onChange={(e) => setPenWidth(e.target.value)} 
        className="cursor-pointer"
      />
      <button onClick={undo} className="px-3 py-1 bg-yellow-500 text-white rounded">Undo</button>
      <button onClick={redo} className="px-3 py-1 bg-green-500 text-white rounded">Redo</button>
      <button onClick={resetCanvas} className="px-3 py-1 bg-red-500 text-white rounded">Reset</button>
    </div>
  );
};

export default CanvasTool;
