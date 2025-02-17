import React, { useState } from 'react';
import { Copy, Sun, Moon } from 'lucide-react';

// Import tool icons
import eraser from '../assets/images/eraser.png';
import pencil from '../assets/images/pencil.png';
import Undo from '../assets/images/undo.png';
import Redo from '../assets/images/redo.png';
import reset from '../assets/images/reset.png';

// Function to copy the current page URL to the clipboard
const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.toString());
    alert('Link is copied to your clipboard.');
    console.log('copied');
};

// CanvasTool component: toolbar for drawing canvas with tools and settings
const CanvasTool = ({ className, tool, setTool, penColor, setPenColor, penWidth, setPenWidth, undo, redo, resetCanvas, darkModeToggle }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [darkMode, setDarkMode] = useState(<Sun className="h-5 w-5 text-black" />);

    return (
        <div className={` ${className} mt-5 top-2 flex gap-3 bg-lime-500 p-2 rounded-lg shadow-md`}>
            {/* Pen tool button */}
            <button title="Pen" onClick={() => setTool('pen')} className={`px-3 py-1 rounded ${tool === 'pen' ? 'bg-lime-600' : ''} active:scale-90 `}>
                <img src={pencil} alt="pencil" className="w-6 h-6" />
            </button>

            {/* Eraser tool button */}
            <button title="eraser" onClick={() => setTool('eraser')} className={`px-3 py-1 rounded ${tool === 'eraser' ? 'bg-lime-600' : ''} active:scale-90 `}>
                <img src={eraser} alt="eraser" className="w-6 h-6" />
            </button>

            {/* Color picker for pen color */}
            <input
                title="color"
                type="color"
                value={penColor}
                onChange={e => setPenColor(e.target.value)}
                className="cursor-pointer rounded-full w-12 h-12 border-none p-0 appearance-none bg-transparent"
            />

            {/* Pen width slider */}
            <input type="range" min="1" max="20" value={penWidth} onChange={e => setPenWidth(e.target.value)} className="cursor-pointer" />

            {/* Undo button */}
            <button title="undo" onClick={undo} className="px-3 py-1 active:scale-90 rounded">
                <img src={Undo} alt="undo" className="w-6 h-6" />
            </button>

            {/* Redo button */}
            <button title="redo" onClick={redo} className="px-3 py-1 active:scale-90 rounded">
                <img src={Redo} alt="redo" className="w-6 h-6" />
            </button>

            {/* Copy URL button */}
            <button onClick={handleCopy} className="p-2 rounded-full transition-colors">
                <Copy className="h-5 w-5 text-black" />
            </button>

            {/* Dark mode toggle button */}
            <button
                onClick={() => {
                    darkModeToggle();
                    setDarkMode(isDarkMode ? <Sun className="h-5 w-5 text-black" /> : <Moon className="h-5 w-5 text-black" />);
                    setIsDarkMode(!isDarkMode);
                }}
                className="p-2 rounded-full transition-colors">
                {darkMode}
            </button>

            {/* Reset canvas button */}
            <button title="Reset" onClick={resetCanvas} className="px-3 py-1 active:scale-90  rounded">
                <img src={reset} alt="reset" className="w-6 h-6" />
            </button>
        </div>
    );
};

export default CanvasTool;
