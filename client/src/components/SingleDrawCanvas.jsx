import React, { useEffect, useRef, useState, useCallback } from 'react';
import CanvasTool from './CanvasTool';

const SingleDrawCanvas = ({ className, localStorageId, width = 800, height = 500 }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [penColor, setPenColor] = useState(darkMode ? '#FFFFFF' : '#000000');
    const [penWidth, setPenWidth] = useState(10);
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
        ctx.fillStyle = darkMode ? '#23272f' : 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctxRef.current = ctx;
        const savedHistory = JSON.parse(localStorage.getItem(`${localStorageId}History`)) || [];
        const savedStep = JSON.parse(localStorage.getItem(`${localStorageId}Step`)) || -1;
        setHistory(savedHistory);
        setStep(savedStep);

        if (savedHistory.length > 0 && savedStep >= 0) {
            restoreCanvas(savedHistory[savedStep]);
        }
    }, [darkMode, width, height, localStorageId, restoreCanvas]);

    useEffect(() => {
        setPenColor(darkMode ? '#FFFFFF' : '#000000');
    }, [darkMode]);

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

        ctx.strokeStyle = tool === 'eraser' ? (darkMode ? '#000000' : '#23272f') : penColor;
        ctx.lineWidth = tool === 'eraser' ? 20 : penWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        drawLine(ctx, lastX.current, lastY.current, offsetX, offsetY);
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
        ctxRef.current.fillStyle = darkMode ? '#23272f' : 'white';
        ctxRef.current.fillRect(0, 0, width, height);
        setHistory([]);
        setStep(-1);
        localStorage.removeItem(`${localStorageId}History`);
        localStorage.removeItem(`${localStorageId}Step`);
    };

    return (
        <div className={` ${className} flex justify-center items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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
                darkModeToggle={() => setDarkMode(!darkMode)}
            />
            <canvas
                className={`${className} border shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
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

export default SingleDrawCanvas;
