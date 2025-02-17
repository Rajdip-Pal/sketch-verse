import React from 'react';
import MultiDrawCanvas from '../components/MultiDrawCanvas';

const Multidraw = () => {
    React.useEffect(() => {
        document.title = 'Sketch Verse | Draw';
    }, []);

    return <MultiDrawCanvas localStorageId="multiDraw" width={window.innerWidth} height={window.innerHeight} darkMode={true} />;
};

export default Multidraw;
