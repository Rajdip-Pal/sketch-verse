import React, { useEffect } from 'react';
import Faq from '../components/Faq';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Footer from '../components/Footer';

const contributors = [
    {
        name: 'suvayu',
        image: '/contributors/suvhayu.jpg',  // Update with actual image paths
        github: 'https://github.com/SuvayuN',
        linkedin: 'https://www.linkedin.com/in/suvayu-nandy/'
    },
    {
        name: 'Rajdip',
        image: '/contributors/rajdip.jpg',
        github: 'https://github.com/Rajdip-Pal',
        linkedin: 'https://www.linkedin.com/in/rajdip-pal/'
    },
    {
        name: 'Prajwal',
        image: '/contributors/prajwal.jpg',
        github: 'https://github.com/prajwallakra',
        linkedin: 'https://www.linkedin.com/in/prajwal-lakra/'
    }
];

function About() {
    useEffect(() => {
        document.title = 'Sketch Verse | About Us';
    }, []);

    return (
        <React.Fragment>
            {/* Heading */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 } }
            >
                <h1 className="text-6xl text-lime-500 font-bold p-6 font-eater">
                    Sketch Verse
                </h1>
            </motion.div>

            {/* About Text */}
            <motion.div
                className="max-w-2xl mx-auto text-white font-keto text-lg leading-relaxed p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
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
                <p>
                    Join us and unleash your creativity while having a great time with friends and fellow artists!
                </p>
            </motion.div>

            {/* Contributors Section */}
            <motion.div
                className="text-center mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-4xl text-lime-400 font-bold font-eater">Meet the Contributors</h2>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
            >
                {contributors.map((contributor, index) => (
                    <div key={index} className="bg-gray-900 p-4 rounded-2xl shadow-lg text-center">
                        <img
                            src={contributor.image}
                            alt={contributor.name}
                            className="w-32 h-32 mx-auto rounded-full border-4 border-lime-500"
                        />
                        <h3 className="text-xl text-lime-400 font-semibold mt-3">{contributor.name}</h3>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}>

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
        </React.Fragment>
    );
}

export default About;
