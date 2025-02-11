import React from 'react';
import Start from '../components/Start';

function Home() {
    return (
        <React.Fragment>
            <Start />
            <button className='px-8 py-2 absolute bottom-4 right-4 font-kotta text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90 '>Start tour</button>
        </React.Fragment>
    );
}

export default Home;
