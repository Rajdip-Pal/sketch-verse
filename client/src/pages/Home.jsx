import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Faq from '../components/Faq';

function Home() {
    document.title = 'Sketch Verse';

    return (
        <React.Fragment>
            <div className="flex items-center justify-center h-screen text-white relative">
                <div className="text-2xl text-center">
                    <motion.h1 className="text-6xl text-lime-500 font-bold p-6 font-kumar">Sketch Verse</motion.h1>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <p className="text-5xl pb-7 font-kotta">
                            <div className="pb-2">Sketch, play, and express,</div>
                            because creativity has no limits on
                            <span className="text-lime-500 px-2 rounded-md">Sketch verse!</span>
                        </p>
                        <p className="text-gray-400 font-nixie font-bold">
                            <div>A collaborative website where you can draw</div>
                            and create alongside others on a shared canvas.
                        </p>
                    </motion.div>

                    <Link to={'/start'}>
                        <button className="px-10 py-2 absolute bottom-8 right-8 font-kotta text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90">
                            Start tour
                        </button>
                    </Link>
                </div>
            </div>
            <Faq />
        </React.Fragment>
    );
}

export default Home;
