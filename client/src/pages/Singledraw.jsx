import React, { useState, useEffect } from 'react';
import SingleDrawCanvas from '../components/SingleDrawCanvas';

export const Singledraw = function () {
    // State to hold canvas dimensions
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // useEffect to handle document title and window resizing
    useEffect(() => {
        // Set the document title when the component is mounted
        document.title = 'Sketch Verse | Draw';

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        // Render SingleDrawCanvas with updated dimensions and props
        <SingleDrawCanvas localStorageId="singleDraw" className="h-screen w-screen border-0 margin-0" width={dimensions.width} height={dimensions.height} />
    );
};

export default Singledraw;
