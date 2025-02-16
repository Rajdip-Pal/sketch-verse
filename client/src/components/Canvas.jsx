import React, { useRef, useState, useEffect } from "react";
import CanvasTool from "./CanvasTool";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000");

const Canvas = ({ width = 800, height = 500, darkMode = false }) => {
  const { roomId } = useParams(); // Get room ID from URL
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState(darkMode ? "white" : "black");
  const [penWidth, setPenWidth] = useState(5);
  const [tool, setTool] = useState("pen");

  useEffect(() => {
    if (!canvasRef.current) {
      console.error("Canvas reference is null");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Unable to get canvas 2D context");
      return;
    }

    ctx.fillStyle = darkMode ? "black" : "white";
    ctx.fillRect(0, 0, width, height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    console.log("Canvas and context initialized successfully", ctxRef.current);

    socket.emit("join-room", roomId); // Join room on mount

    socket.on("draw", ({ x, y, prevX, prevY, color, width }) => {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = width;
      drawLine(prevX, prevY, x, y);
    });

    return () => {
      socket.off("draw");
    };
  }, [darkMode, width, height, roomId]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetX: prevX, offsetY: prevY } = ctxRef.current;

    ctxRef.current.strokeStyle = tool === "eraser" ? (darkMode ? "black" : "white") : penColor;
    ctxRef.current.lineWidth = tool === "eraser" ? 20 : penWidth;
    drawLine(prevX, prevY, offsetX, offsetY);

    // Emit drawing to others in the same room
    socket.emit("draw", { roomId, x: offsetX, y: offsetY, prevX, prevY, color: ctxRef.current.strokeStyle, width: ctxRef.current.lineWidth });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const drawLine = (x1, y1, x2, y2) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x1, y1);
    ctxRef.current.lineTo(x2, y2);
    ctxRef.current.stroke();
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x2, y2);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="absolute top-0">
        <CanvasTool 
        tool={tool} 
        setTool={setTool} 
        penColor={penColor} 
        setPenColor={setPenColor} 
        penWidth={penWidth} 
        setPenWidth={setPenWidth} 
      /></div>
      
      <div className="relative flex flex-col items-center w-full">
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
    </div>
  );
};

export default Canvas;
