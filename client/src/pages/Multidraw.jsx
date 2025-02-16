import React from 'react';
import Canvas from '../components/Canvas';

const Multidraw = () => {
    React.useEffect(() => {
        document.title = 'Sketch Verse | Draw';
    }, []);

    return <Canvas localStorageId="multiDraw" width={window.innerWidth} height={window.innerHeight} darkMode={true} />;
};

export default Multidraw;
