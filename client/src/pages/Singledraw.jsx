import React from 'react';
import SingleDrawCanvas from '../components/SingleDrawCanvas';

export const Singledraw = function () {
    React.useEffect(() => {
        document.title = 'Sketch Verse | Draw';
    });

    return <SingleDrawCanvas localStorageId="singleDraw" className="h-screen w-screen" width={window.innerWidth} height={window.innerHeight} />;
};

export default Singledraw;
