import React, { useRef, useState, useEffect } from "react";
import CanvasTool from "./CanvasTool";

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
      <CanvasTool 
        tool={tool} 
        setTool={setTool} 
        penColor={penColor} 
        setPenColor={setPenColor} 
        penWidth={penWidth} 
        setPenWidth={setPenWidth} 
        undo={undo} 
        redo={redo} 
        resetCanvas={resetCanvas} 
      />
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
