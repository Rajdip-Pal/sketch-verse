import React, { useEffect, useRef, useState, useCallback } from 'react';
import CanvasTool from './CanvasTool'; // Import the CanvasTool component

const SingleDrawCanvas = ({ className, localStorageId, width = 800, height = 500 }) => {
    // State variables for canvas properties and history
    const [darkMode, setDarkMode] = useState(false); // Toggle for dark mode
    const [isDrawing, setIsDrawing] = useState(false); // Track if drawing is in progress
    const [penColor, setPenColor] = useState(darkMode ? '#FFFFFF' : '#000000'); // Set pen color based on dark mode
    const [penWidth, setPenWidth] = useState(10); // Set the default pen width
    const [history, setHistory] = useState([]); // Store the drawing history (as Data URLs)
    const [step, setStep] = useState(-1); // Track the current step in the history
    const [tool, setTool] = useState('pen'); // Track the current tool (pen or eraser)

    // Refs to access the canvas context and drawing position
    const canvasRef = useRef(null); // Reference to the canvas element
    const ctxRef = useRef(null); // Reference to the 2D drawing context
    const lastX = useRef(null); // Store the last X position for drawing
    const lastY = useRef(null); // Store the last Y position for drawing

    // Function to draw a line between two points
    const drawLine = (ctx, x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    // Function to restore the canvas to a previous state using a data URL
    const restoreCanvas = useCallback(
        dataURL => {
            const img = new Image();
            img.src = dataURL; // Set the image source to the saved canvas state (data URL)
            img.onload = () => {
                // Clear the current canvas and draw the image (previous state)
                ctxRef.current.clearRect(0, 0, width, height);
                ctxRef.current.drawImage(img, 0, 0);
            };
        },
        [width, height], // Dependencies: width and height of the canvas
    );

    // Initial setup when the component is mounted
    useEffect(() => {
        const canvas = canvasRef.current; // Get the canvas element
        const ctx = canvas.getContext('2d'); // Get the 2D context for drawing
        ctx.fillStyle = darkMode ? '#23272f' : 'white'; // Set the background color based on dark mode
        ctx.fillRect(0, 0, width, height); // Fill the canvas with the background color
        ctx.lineCap = 'round'; // Set line cap style to round for smoother lines
        ctx.lineJoin = 'round'; // Set line join style to round for smoother corners
        ctxRef.current = ctx; // Store the context reference in the ref

        // Load the saved drawing history and step from localStorage
        const savedHistory = JSON.parse(localStorage.getItem(`${localStorageId}History`)) || [];
        const savedStep = JSON.parse(localStorage.getItem(`${localStorageId}Step`)) || -1;
        setHistory(savedHistory); // Set the history state
        setStep(savedStep); // Set the current step

        // Restore the canvas to the saved state if there is any history
        if (savedHistory.length > 0 && savedStep >= 0) {
            restoreCanvas(savedHistory[savedStep]);
        }
    }, [darkMode, width, height, localStorageId, restoreCanvas]);

    // Effect to update pen color when dark mode changes
    useEffect(() => {
        setPenColor(darkMode ? '#FFFFFF' : '#000000'); // Set pen color based on dark mode
    }, [darkMode]);

    // Function to get the touch position on the canvas (for touch devices)
    const getTouchPos = (canvas, touchEvent) => {
        const rect = canvas.getBoundingClientRect(); // Get the canvas bounding rectangle
        return {
            x: touchEvent.touches[0].clientX - rect.left, // Calculate the X position of the touch
            y: touchEvent.touches[0].clientY - rect.top, // Calculate the Y position of the touch
        };
    };

    // Function to start drawing with the mouse (for mouse events)
    const startDrawing = e => {
        const { offsetX, offsetY } = e.nativeEvent; // Get the mouse position relative to the canvas
        ctxRef.current.beginPath(); // Start a new path for the line
        ctxRef.current.moveTo(offsetX, offsetY); // Move to the start position
        setIsDrawing(true); // Set the drawing state to true
        lastX.current = offsetX; // Store the current X position
        lastY.current = offsetY; // Store the current Y position
    };

    // Function to start drawing with touch input (for touch devices)
    const startDrawingTouch = e => {
        e.preventDefault(); // Prevent default touch behavior (like scrolling)
        const { x, y } = getTouchPos(canvasRef.current, e); // Get the touch position on the canvas
        ctxRef.current.beginPath(); // Start a new path for the line
        ctxRef.current.moveTo(x, y); // Move to the start position
        setIsDrawing(true); // Set the drawing state to true
        lastX.current = x; // Store the current X position
        lastY.current = y; // Store the current Y position
    };

    // Function to draw while the mouse is moving (for mouse events)
    const draw = e => {
        if (!isDrawing) return; // Only draw if isDrawing is true
        const { offsetX, offsetY } = e.nativeEvent; // Get the mouse position relative to the canvas
        const ctx = ctxRef.current; // Get the 2D context

        // Set the stroke style based on the tool (pen or eraser)
        ctx.strokeStyle = tool === 'eraser' ? (darkMode ? '#000000' : '#23272f') : penColor;
        ctx.lineWidth = tool === 'eraser' ? 20 : penWidth; // Set the pen width for drawing or erasing
        ctx.lineCap = 'round'; // Set line cap to round for smooth lines
        ctx.lineJoin = 'round'; // Set line join to round for smooth corners

        drawLine(ctx, lastX.current, lastY.current, offsetX, offsetY); // Draw a line from the previous position to the current position
        lastX.current = offsetX; // Update the last X position
        lastY.current = offsetY; // Update the last Y position
    };

    // Function to draw while the touch is moving (for touch devices)
    const drawTouch = e => {
        if (!isDrawing) return; // Only draw if isDrawing is true
        e.preventDefault(); // Prevent default touch behavior (like scrolling)
        const { x, y } = getTouchPos(canvasRef.current, e); // Get the touch position on the canvas
        const ctx = ctxRef.current; // Get the 2D context

        // Set the stroke style based on the tool (pen or eraser)
        ctx.strokeStyle = tool === 'eraser' ? (darkMode ? '#000000' : '#23272f') : penColor;
        ctx.lineWidth = penWidth; // Set the pen width for drawing
        ctx.lineCap = 'round'; // Set line cap to round for smooth lines
        ctx.lineJoin = 'round'; // Set line join to round for smooth corners

        drawLine(ctx, lastX.current, lastY.current, x, y); // Draw a line from the previous position to the current position
        lastX.current = x; // Update the last X position
        lastY.current = y; // Update the last Y position
    };

    // Function to stop drawing when the mouse is released (for mouse events)
    const stopDrawing = () => {
        if (!isDrawing) return; // Only stop if isDrawing is true
        ctxRef.current.closePath(); // Close the current drawing path
        setIsDrawing(false); // Set drawing state to false
        saveHistory(); // Save the current state to history
        lastX.current = null; // Reset the last X position
        lastY.current = null; // Reset the last Y position
    };

    // Function to save the current drawing state to history
    const saveHistory = () => {
        const newHistory = [...history.slice(0, step + 1), canvasRef.current.toDataURL()]; // Add the current canvas state (as a data URL) to history
        setHistory(newHistory); // Update the history state
        setStep(newHistory.length - 1); // Set the current step to the last one
        localStorage.setItem(`${localStorageId}History`, JSON.stringify(newHistory)); // Save the history to localStorage
        localStorage.setItem(`${localStorageId}Step`, JSON.stringify(newHistory.length - 1)); // Save the current step to localStorage
    };

    // Function to undo the last drawing action
    const undo = () => {
        if (step <= 0) return; // Prevent undo if there are no steps to go back
        setStep(step - 1); // Decrease the step
        restoreCanvas(history[step - 1]); // Restore the canvas to the previous step
    };

    // Function to redo the last undone drawing action
    const redo = () => {
        if (step >= history.length - 1) return; // Prevent redo if there are no steps to redo
        setStep(step + 1); // Increase the step
        restoreCanvas(history[step + 1]); // Restore the canvas to the next step
    };

    // Function to reset the canvas to its initial state
    const resetCanvas = () => {
        ctxRef.current.fillStyle = darkMode ? '#23272f' : 'white'; // Set the background color based on dark mode
        ctxRef.current.fillRect(0, 0, width, height); // Fill the canvas with the background color
        setHistory([]); // Clear the history
        setStep(-1); // Reset the current step
        localStorage.removeItem(`${localStorageId}History`); // Remove history from localStorage
        localStorage.removeItem(`${localStorageId}Step`); // Remove step from localStorage
    };

    return (
        <div className={` ${className} flex justify-center items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {/* Canvas Tool Component for tool options and controls */}
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
                darkModeToggle={() => setDarkMode(!darkMode)} // Toggle dark mode
            />
            {/* Canvas element for drawing */}
            <canvas
                className={`${className} border shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                ref={canvasRef}
                width={width}
                height={height}
                onMouseDown={startDrawing} // Mouse down event to start drawing
                onMouseMove={draw} // Mouse move event to draw
                onMouseUp={stopDrawing} // Mouse up event to stop drawing
                onMouseOut={stopDrawing} // Mouse out event to stop drawing
                onTouchStart={startDrawingTouch} // Touch start event to start drawing
                onTouchMove={drawTouch} // Touch move event to draw
                onTouchEnd={stopDrawing} // Touch end event to stop drawing
                onTouchCancel={stopDrawing} // Touch cancel event to stop drawing
            ></canvas>
        </div>
    );
};

export default SingleDrawCanvas;
