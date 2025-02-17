// Import dependencies
import React from 'react';
import { motion } from 'framer-motion';

// Importing card functions for building card components
import * as Navbar from '../components/Navbar';
import * as CardFunctions from '../modules/CardFunctions';

// Importing images for card components
import singleDrawLogo from '../assets/images/singleDrawLogo.png';
import colaboarationLogo from '../assets/images/colaboarationLogo.png';

// Main Board component for the Sketch Verse application
export default function Board() {
    React.useEffect(() => {
        // Update the document title when the component mounts
        document.title = 'Sketch Verse | Whiteboard';
    }, []);

    // Data for the card components
    const cardData = [
        {
            img: singleDrawLogo,
            imageAbout: 'single draw',
            heading: 'Draw',
            content: `Unleash your creativity on the canvas—sketch, doodle, and design your masterpiece effortlessly`,
            buttonField: 'Explore',
            buttonLink: '/singledraw',
        },
        {
            img: colaboarationLogo,
            imageAbout: 'colaboration image',
            heading: 'Draw with friends',
            content: 'Unleash your creativity on the canvas—sketch, doodle, and design your masterpiece effortlessly',
            buttonField: 'Explore',
            buttonLink: '/multidraw',
        },
    ];

    return (
        <React.Fragment>
            {/* Main container with flexbox for centering and styling */}
            <div className="hidden md:flex items-center justify-center h-screen text-white">
                <div className="text-2xl text-center">
                    {/* Animated heading using Framer Motion */}
                    <motion.h1 className="text-6xl text-lime-500 font-bold p-6 font-eater">Sketch Verse</motion.h1>

                    {/* Card components rendered dynamically with animation */}
                    <motion.div className="md:flex justify-center gap-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        {CardFunctions.buildCards(cardData)}
                    </motion.div>
                </div>
            </div>

            {/*  */}
            <div className="flex flex-col md:hidden align-middle items-center justify-center">
                <div className="text-center">
                    {/* Animated heading using Framer Motion */}
                    <Navbar.FixedTopLeft id="startTop" headline={'Sketch Verse'} path={'/'} />
                    <motion.div initial={{ opacity: 0, x: 20, y: 30 }} animate={{ opacity: 1, x: 0, y: 30 }} transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}>
                        {CardFunctions.buildCards(cardData)}
                    </motion.div>
                </div>
            </div>
        </React.Fragment>
    );
}
