import React, { useEffect } from 'react';
import Faq from '../components/Faq';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// Import components for usage
import * as Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import image assets
import Rajdip_Pal from '../assets/contributors/rajdip-pal.jpg';
import Suvayu_Nandy from '../assets/contributors/suvayu-nandy.jpg';
import Prajwal_Lakra from '../assets/contributors/prajwal-lakra.jpeg';

// Contributors Details
const contributors = [
    {
        name: 'Suvayu Nandy',
        image: Suvayu_Nandy,
        github: 'https://github.com/SuvayuN',
        linkedin: 'https://www.linkedin.com/in/suvayu-nandy/',
    },
    {
        name: 'Rajdip Pal',
        image: Rajdip_Pal,
        github: 'https://github.com/Rajdip-Pal',
        linkedin: 'https://www.linkedin.com/in/rajdip-pal/',
    },
    {
        name: 'Prajwal Lakra',
        image: Prajwal_Lakra,
        github: 'https://github.com/prajwallakra',
        linkedin: 'https://www.linkedin.com/in/prajwal-lakra/',
    },
];

// Main rendering functions
function About() {
    useEffect(() => {
        document.title = 'Sketch Verse | About Us';
    }, []);

    return (
        <React.Fragment>
            <Navbar.FixedTopLeft id="startTop" headline={'Sketch Verse'} path={'/'} />

            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 100 }} transition={{ duration: 0.8 }} className="w-full">
                {/* Heading */}
                <motion.div className="hidden md:inline text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="text-6xl text-lime-500 font-bold p-6 font-eater">Sketch Verse</h1>
                </motion.div>

                {/* About Text */}
                <motion.div
                    className="max-w-2xl mx-auto text-white font-keto text-lg leading-relaxed p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}>
                    <p>
                        Welcome to <span className="text-lime-400 font-semibold">Sketch Verse</span>, an interactive drawing platform where creativity meets fun! 🎨
                    </p>
                    <br />
                    <p>
                        🎭 <span className="text-lime-300 font-medium">Single Mode</span>: Sketch freely and bring your ideas to life.
                        <br />
                        🎶 <span className="text-lime-300 font-medium">Jamming Mode</span>: Collaborate with friends and create together.
                        <br />
                        🎮 <span className="text-lime-300 font-medium">Draw & Guess Game</span>: Up to 10 players compete—one draws while others guess the word to earn points!
                    </p>
                    <br />
                    <p>Join us and unleash your creativity while having a great time with friends and fellow artists!</p>
                </motion.div>

                {/* Contributors Section */}
                <motion.div className="text-center mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <h2 className="text-4xl text-lime-400 font-bold font-eater">Meet the Contributors</h2>
                </motion.div>

                <motion.div
                    className="flex flex-col md:flex-row gap-6 justify-center p-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}>
                    {contributors.map((contributor, index) => (
                        <div key={index} className="bg-gray-900 p-4 rounded-2xl shadow-lg text-center justify-center align-middle items-center md:w-[10%] h-[100%]">
                            <img src={contributor.image} alt={contributor.name} className="w-32 h-32 mx-auto rounded-full border-4 border-lime-500" />
                            <h3 className="text-xl text-lime-400 font-semibold mt-3">{contributor.name}</h3>
                            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}>
                                <div className="flex justify-center gap-4 mt-2">
                                    <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="text-blue-500 text-2xl hover:text-blue-600 active:scale-90 transition" />
                                    </a>
                                    <a href={contributor.github} target="_blank" rel="noopener noreferrer">
                                        <FaGithub className="text-gray-300 text-2xl hover:text-gray-400 active:scale-90 transition" />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>

                <Faq />
                <Footer />
            </motion.div>
        </React.Fragment>
    );
}

export default About;
