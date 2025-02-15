// import dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// import Components
import * as Navbar from '../components/Navbar';

/**
 * Home component that renders the main page of the Sketch Verse application.
 * @returns {JSX.Element} The JSX element representing the home page.
 */
export default function Home() {
    React.useEffect(() => {
        // Update the document title when the component mounts
        document.title = 'Sketch Verse';
    }, []);

    return (
        // Container element that centers the content vertically and horizontally
        <React.Fragment>
            {/* For Devices with a screen width of 768px or more */}
            <div className="hidden md:flex items-center justify-center h-screen text-white ">
                <div className="text-2xl text-center">
                    {/* Main title with animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-6xl text-lime-500 font-bold p-3 font-kumar m-2">
                        Sketch Verse
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        {/* Tagline with a call-to-action */}
                        <p className="text-5xl pb-7 font-kotta">
                            <span className="pb-2 block">Sketch, play, and express,</span>
                            because creativity has no limits on
                            <span className="text-lime-500 px-2">Sketch verse!</span>
                        </p>

                        {/* Description of the Sketch Verse application */}
                        <p className="text-gray-400 font-nixie font-bold">
                            <span className="block">A collaborative website where you can draw</span>
                            and create alongside others on a shared canvas.
                        </p>
                    </motion.div>

                    {/* Start Tour button with link */}
                    <Link to={'/start'}>
                        <button
                            className="px-10 py-2 absolute bottom-8 right-8 font-kotta text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90"
                            aria-label="Start the Sketch Verse tour">
                            Start tour
                        </button>
                    </Link>
                </div>
            </div>
            {/* For Devices with a screen width of 768px or less */}
            <div className="flex flex-col md:hidden h-screen align-middle items-center justify-center">
                <Navbar.FixedTopLeft headline={'Sketch Verse'} path={'/'} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center align-middle justify-center">
                    {/* Tagline with a call-to-action */}
                    <p className="text-xl pb-7 font-kotta text-white">
                        Sketch, play, and express, because creativity has no limits on
                        <strong className="text-lime-500 px-2">Sketch verse!</strong>
                    </p>

                    {/* Description of the Sketch Verse application */}
                    <p className="text-gray-400 font-nixie font-bold">
                        <span className="block">A collaborative website where you can draw</span>
                        and create alongside others on a shared canvas.
                    </p>
                </motion.div>

                {/* Start Tour button with link */}
                <Link to={'/start'}>
                    <button
                        className="px-10 py-2  bottom-8 right-8 font-kotta text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90"
                        aria-label="Start the Sketch Verse tour">
                        Start tour
                    </button>
                </Link>
            </div>
        </React.Fragment>
    );
}
