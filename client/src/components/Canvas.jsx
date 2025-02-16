import React from 'react';
import CanvasTool from './CanvasTool';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5000');

const Canvas = ({ className, localStorageId, width = 800, height = 500, darkMode = false }) => {
    const { roomId } = useParams(); // Get room ID from URL

    const canvasRef = React.useRef(null);
    const ctxRef = React.useRef(null);
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [penColor, setPenColor] = React.useState(darkMode ? 'white' : 'black');
    const [penWidth, setPenWidth] = React.useState(5);
    const [history, setHistory] = React.useState([]);
    const [step, setStep] = React.useState(-1);
    const [tool, setTool] = React.useState('pen');

    const restoreCanvas = React.useCallback(
        dataURL => {
            const img = new Image();
            img.src = dataURL;
            img.onload = () => {
                ctxRef.current.clearRect(0, 0, width, height);
                ctxRef.current.drawImage(img, 0, 0);
            };
        },
        [width, height, ctxRef],
    );

    React.useEffect(() => {
        if (!canvasRef.current) {
            console.error('Canvas reference is null');
            return;
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error('Unable to get canvas 2D context');
            return;
        }
        ctx.fillStyle = darkMode ? 'black' : 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctxRef.current = ctx;

        console.log('Canvas and context initialized successfully', ctxRef.current);

        socket.emit('join-room', roomId); // Join room on mount

        socket.on('draw', ({ x, y, prevX, prevY, color, width }) => {
            ctxRef.current.strokeStyle = color;
            ctxRef.current.lineWidth = width;
            drawLine(prevX, prevY, x, y);
        });

        const savedHistory = JSON.parse(localStorage.getItem(`${localStorageId}History`)) || [];
        const savedStep = JSON.parse(localStorage.getItem(`${localStorageId}Step`)) || -1;
        setHistory(savedHistory);
        setStep(savedStep);

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
    };

    const drawLine = (x1, y1, x2, y2) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x1, y1);
        ctxRef.current.lineTo(x2, y2);
        ctxRef.current.stroke();
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(x2, y2);
    };

    const draw = e => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        ctxRef.current.strokeStyle = tool === 'eraser' ? (darkMode ? 'black' : 'white') : penColor;
        ctxRef.current.lineWidth = tool === 'eraser' ? 20 : penWidth;
        drawLine(prevX, prevY, offsetX, offsetY);

        // Emit drawing to others in the same room
        socket.emit('draw', { roomId, x: offsetX, y: offsetY, prevX, prevY, color: ctxRef.current.strokeStyle, width: ctxRef.current.lineWidth });
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        ctxRef.current.closePath();
        setIsDrawing(false);
        saveHistory();
    };

    const saveHistory = () => {
        const canvas = canvasRef.current;
        const newHistory = [...history.slice(0, step + 1), canvas.toDataURL()];
        setHistory(newHistory);
        setStep(newHistory.length - 1);
        localStorage.setItem(`${localStorageId}History`, JSON.stringify(newHistory));
        localStorage.setItem(`${localStorageId}Step`, JSON.stringify(newHistory.length - 1));
    };

    const undo = () => {
        if (step <= 0) return;
        setStep(prev => prev - 1);
        restoreCanvas(history[step - 1]);
    };

    const redo = () => {
        if (step >= history.length - 1) return;
        setStep(prev => prev + 1);
        restoreCanvas(history[step + 1]);
    };

    const resetCanvas = () => {
        ctxRef.current.fillStyle = darkMode ? 'black' : 'white';
        ctxRef.current.fillRect(0, 0, width, height);
        setHistory([]);
        setStep(-1);
        // Clear LocalStorage
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
