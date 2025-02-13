import React, { useRef, useState, useEffect } from "react";

const Canvas = ({ width = 800, height = 500, darkMode = false }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState(darkMode ? "white" : "black");
  const [penWidth, setPenWidth] = useState(5);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(-1);
  const [tool, setTool] = useState("pen");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = darkMode ? "black" : "white";
    ctx.fillRect(0, 0, width, height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
  }, [darkMode, width, height]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.strokeStyle = tool === "eraser" ? (darkMode ? "black" : "white") : penColor;
    ctxRef.current.lineWidth = tool === "eraser" ? 20 : penWidth;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
    saveHistory();
  };

  const saveHistory = () => {
    const canvas = canvasRef.current;
    setHistory((prev) => [...prev.slice(0, step + 1), canvas.toDataURL()]);
    setStep((prev) => prev + 1);
  };

  const undo = () => {
    if (step <= 0) return;
    setStep((prev) => prev - 1);
    restoreCanvas(history[step - 1]);
  };

  const redo = () => {
    if (step >= history.length - 1) return;
    setStep((prev) => prev + 1);
    restoreCanvas(history[step + 1]);
  };

  const resetCanvas = () => {
    ctxRef.current.fillStyle = darkMode ? "black" : "white";
    ctxRef.current.fillRect(0, 0, width, height);
    setHistory([]);
    setStep(-1);
  };

  const restoreCanvas = (dataURL) => {
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctxRef.current.clearRect(0, 0, width, height);
      ctxRef.current.drawImage(img, 0, 0);
    };
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      <div className="absolute top-2 flex gap-3 bg-gray-200 p-2 rounded-lg shadow-md">
        <button onClick={() => setTool("pen")} className={`px-3 py-1 rounded ${tool === "pen" ? "bg-blue-700" : "bg-blue-500"} text-white`}>Pen</button>
        <button onClick={() => setTool("eraser")} className={`px-3 py-1 rounded ${tool === "eraser" ? "bg-gray-700" : "bg-gray-500"} text-white`}>Eraser</button>
        <input type="color" value={penColor} onChange={(e) => setPenColor(e.target.value)} />
        <input type="range" min="1" max="20" value={penWidth} onChange={(e) => setPenWidth(e.target.value)} />
        <button onClick={undo} className="px-3 py-1 bg-yellow-500 text-white rounded">Undo</button>
        <button onClick={redo} className="px-3 py-1 bg-green-500 text-white rounded">Redo</button>
        <button onClick={resetCanvas} className="px-3 py-1 bg-red-500 text-white rounded">Reset</button>
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border mt-16 shadow-lg"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      ></canvas>
    </div>
  );
};

export default Canvas;
