// Import dependencies for usage
import React from 'react';
import { motion } from 'framer-motion';

// Import components for usage
import * as Navbar from '../components/Navbar';
import * as CardFunctions from '../modules/CardFunctions';

// Import images used for the card components
import gameLogo from '../assets/images/demo.jpeg';
import whiteBoardLogo from '../assets/images/demo.jpg';

export default function Start() {
    React.useEffect(() => {
        // Update the document title when the component mounts
        document.title = 'Sketch Verse | Explore';
    }, []);

    // Array containing data for each card displayed on the page
    const cardData = [
        {
            img: whiteBoardLogo,
            imageAbout: 'Demo Image',
            heading: 'WhiteBoard',
            content: (
                <React.Fragment>
                    🎨 Unleash your creativity and teamwork with a powerful, real - time online whiteboard. Whether you're brainstorming ideas, teaching a class, or working on a
                    project, our intuitive whiteboard makes collaboration easy and efficient.
                </React.Fragment>
            ),
            buttonField: 'Explore',
            buttonLink: '/whiteboard',
        },
        {
            img: gameLogo,
            imageAbout: 'Demo Image',
            heading: 'Game',
            content: (
                <React.Fragment>
                    🎨 Unleash Your Creativity! Join a fun and fast-paced online drawing game where you sketch, guess, and compete with friends. Make your Experience good with
                    <strong> Sketch-verse </strong>.
                </React.Fragment>
            ),
            buttonField: 'Explore',
            buttonLink: '/game',
        },
    ];

    // JSX structure for the Start component
    return (
        <React.Fragment>
            <div className="hidden md:flex flex-col h-screen items-center justify-center text-white">
                <div id="startTop" className="text-2xl text-center">
                    {/* Main heading with motion animation */}
                    <motion.div
                        className="text-6xl text-lime-500 font-bold p-6 font-eater"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}>
                        Sketch Verse
                    </motion.div>

                    {/* Container for card components with motion animation */}
                    <motion.div
                        className="md:flex justify-center gap-6 p-6 rounded-lg"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}>
                        {CardFunctions.buildCards(cardData)}
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-col md:hidden align-middle items-center justify-center">
                {/* Mobile-friendly heading with motion animation */}
                <Navbar.FixedTopLeft id="startTop" headline={'Sketch Verse'} path={'/'} />
                <motion.div initial={{ opacity: 0, x: 20, y: 30 }} animate={{ opacity: 1, x: 0, y: 30 }} transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}>
                    {CardFunctions.buildCards(cardData)}
                </motion.div>
            </div>
        </React.Fragment>
    );
}
