import React from 'react';
import * as Navbar from '../components/Navbar';

export default function Game() {
    document.title = 'Sketch Verse | Game';

    return (
        <React.Fragment>
            <Navbar.FixedTopRight path="/" children={'Sketch Verse'} />
        </React.Fragment>
    );
}
