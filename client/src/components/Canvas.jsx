import React, { useEffect, useRef, useState, useCallback } from 'react';
import CanvasTool from './CanvasTool';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io("https://sketch-verse.onrender.com");

const Canvas = ({ className, localStorageId, width = 800, height = 500, darkMode = false }) => {
    const { roomId } = useParams();
    const [isDrawing, setIsDrawing] = useState(false);
    const [penColor, setPenColor] = useState(darkMode ? 'white' : 'black');
    const [penWidth, setPenWidth] = useState(5);
    const [history, setHistory] = useState([]);
    const [step, setStep] = useState(-1);
    const [tool, setTool] = useState('pen');

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const lastX = useRef(null);
    const lastY = useRef(null);

    const drawLine = (ctx, x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    const restoreCanvas = useCallback(
        dataURL => {
            const img = new Image();
            img.src = dataURL;
            img.onload = () => {
                ctxRef.current.clearRect(0, 0, width, height);
                ctxRef.current.drawImage(img, 0, 0);
            };
        },
        [width, height],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = darkMode ? 'black' : 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctxRef.current = ctx;

        socket.emit('join-room', roomId);

        socket.on('draw', ({ x, y, prevX, prevY, color, width }) => {
            ctxRef.current.strokeStyle = color;
            ctxRef.current.lineWidth = width;
            drawLine(ctxRef.current, prevX, prevY, x, y);
        });

        const savedHistory = JSON.parse(localStorage.getItem(`${localStorageId}History`)) || [];
        const savedStep = JSON.parse(localStorage.getItem(`${localStorageId}Step`)) || -1;
        setHistory(savedHistory);
        setStep(savedStep);

        socket.on('reset-canvas', () => {
            ctxRef.current.fillStyle = darkMode ? 'black' : 'white';
            ctxRef.current.fillRect(0, 0, width, height);
            setHistory([]);
            setStep(-1);
            localStorage.removeItem(`${localStorageId}History`);
            localStorage.removeItem(`${localStorageId}Step`);
        });

        if (savedHistory.length > 0 && savedStep >= 0) {
            restoreCanvas(savedHistory[savedStep]);
        }

        return () => {
            socket.off('draw');
        };
    }, [darkMode, width, height, roomId, localStorageId, restoreCanvas]);

    const startDrawing = e => {
        const { offsetX, offsetY } = e.nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
        lastX.current = offsetX;
        lastY.current = offsetY;
    };

    const draw = e => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const ctx = ctxRef.current;

        ctx.strokeStyle = tool === 'eraser' ? (darkMode ? '#000000' : '#FFFFFF') : penColor;
        ctx.lineWidth = tool === 'eraser' ? 20 : penWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        drawLine(ctx, lastX.current, lastY.current, offsetX, offsetY);

        socket.emit('draw', {
            roomId,
            x: offsetX,
            y: offsetY,
            prevX: lastX.current,
            prevY: lastY.current,
            color: ctx.strokeStyle,
            width: ctx.lineWidth,
        });

        lastX.current = offsetX;
        lastY.current = offsetY;
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        ctxRef.current.closePath();
        setIsDrawing(false);
        saveHistory();
        lastX.current = null;
        lastY.current = null;
    };

    const saveHistory = () => {
        const newHistory = [...history.slice(0, step + 1), canvasRef.current.toDataURL()];
        setHistory(newHistory);
        setStep(newHistory.length - 1);
        localStorage.setItem(`${localStorageId}History`, JSON.stringify(newHistory));
        localStorage.setItem(`${localStorageId}Step`, JSON.stringify(newHistory.length - 1));
    };

    const undo = () => {
        if (step <= 0) return;
        setStep(step - 1);
        restoreCanvas(history[step - 1]);
    };

    const redo = () => {
        if (step >= history.length - 1) return;
        setStep(step + 1);
        restoreCanvas(history[step + 1]);
    };

    const resetCanvas = () => {
        // Clear the canvas
        ctxRef.current.fillStyle = darkMode ? 'black' : 'white';
        ctxRef.current.fillRect(0, 0, width, height);

        // Remove drawing history
        setHistory([]);
        setStep(-1);

        // Emit reset-canvas event to all connected clients
        socket.emit('reset-canvas', {
            roomId,
        });

        // Remove local storage history
        localStorage.removeItem(`${localStorageId}History`);
        localStorage.removeItem(`${localStorageId}Step`);
    };

    return (
        <div className={` ${className} flex justify-center items-center`}>
            <CanvasTool
                className="absolute top-0 z-5"
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
                className={`${className} border shadow-lg`}
                ref={canvasRef}
                width={width}
                height={height}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}></canvas>
        </div>
    );
};

export default Canvas;
