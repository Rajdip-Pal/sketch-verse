import React from 'react';
import MultiDrawCanvas from '../components/MultiDrawCanvas';

const Multidraw = () => {
    React.useEffect(() => {
        document.title = 'Sketch Verse | Draw Together';
    }, []);

    return <MultiDrawCanvas className="h-screen w-screen" width={window.innerWidth} height={window.innerHeight} />;
};

export default Multidraw;
