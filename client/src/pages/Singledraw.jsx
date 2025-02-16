import React from 'react';
import Canvas from '../components/Canvas';

export const Singledraw = function () {
    React.useEffect(() => {
        document.title = 'Sketch Verse | Draw';
    });

    return <Canvas localStorageId="singleDraw" className="overflow-hidden" width={window.innerWidth} height={window.innerHeight} />;
};

export default Singledraw;
