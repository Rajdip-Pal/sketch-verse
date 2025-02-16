import React from 'react';
import CanvasTool from './CanvasTool';

const Canvas = ({ className, localStorageId, width = 800, height = 500, darkMode = false }) => {
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
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = darkMode ? 'black' : 'white';
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

    const startDrawing = e => {
        const { offsetX, offsetY } = e.nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = e => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = e.nativeEvent;
        ctxRef.current.strokeStyle = tool === 'eraser' ? (darkMode ? 'black' : 'white') : penColor;
        ctxRef.current.lineWidth = tool === 'eraser' ? 20 : penWidth;
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
