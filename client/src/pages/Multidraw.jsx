// Import necessary libraries and components
import React, { useEffect } from 'react';

// import Components
import MultiDrawCanvas from '../components/MultiDrawCanvas';

// Functional component for the Multidraw page
const Multidraw = () => {
    // useEffect hook to set the document title when the component mounts
    useEffect(() => {
        document.title = 'Sketch Verse | Draw Together';
    }, []);

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    return <MultiDrawCanvas className="h-screen w-screen border-0 margin-0" width={canvasWidth} height={canvasHeight} />;
};

export default Multidraw;
