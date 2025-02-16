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
                    <motion.h1 className="text-xl 2xl:text-6xl xl:text-4xl text-lime-500 font-bold p-6 font-eater mb-3">Sketch Verse</motion.h1>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <p className="text-xl 2xl:text-5xl xl:text-3xl pb-7 font-kota">
                            <div className="pb-2">Sketch, play, and express,</div>
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
                        <button className="px-10 py-2 absolute bottom-8 right-8 font-kota text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90">
                            Start tour
                        </button>
                    </Link>
                </div>
            </div>

            {/* For Devices with a screen width of 768px or less */}
            <div className="flex flex-col md:hidden h-screen align-middle items-center justify-center">
                <Navbar.FixedTopLeft headline="Sketch Verse" path={'/'} />

                <motion.h1 className="text-3xl text-lime-500 font-bold p-6 font-eater">Sketch Verse</motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center align-middle justify-center max-w-[80%] ">
                    {/* Tagline with a call-to-action */}
                    <p className="text-xl pb-7 font-kota text-white">
                        Sketch, play, and express, because creativity has no limits on
                        <strong className="text-lime-500 px-2">Sketch verse!</strong>
                    </p>

                    {/* Description of the Sketch Verse application */}
                    <p className="text-gray-400 font-nixie font-bold">A collaborative website where you can draw and create alongside others on a shared canvas.</p>
                </motion.div>

                {/* Start Tour button with link */}
                <Link to={'/start'}>
                    <button
                        className="px-10 py-2 my-5 font-kota text-xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90"
                        aria-label="Start the Sketch Verse tour">
                        Start tour
                    </button>
                </Link>
            </div>
        </React.Fragment>
    );
}
