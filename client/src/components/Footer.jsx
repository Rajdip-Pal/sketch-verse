import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // If using React Router

function Footer() {
    return (
        <motion.footer 
            className="bg-gray-900 text-white w-full py-6 px-4 mt-6 md:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                
                {/* Left Section - Logo & Rights */}
                <div>
                    <h2 className="text-3xl mt-10 font-bold font-eater text-lime-400">Sketch Verse</h2>
                    <p className="text-gray-400 mt-2">© {new Date().getFullYear()} Sketch Verse. All Rights Reserved.</p>
                </div>

                {/* Center Section - Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-lime-400">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        <li><Link to="/" className="hover:text-lime-300 transition">Home</Link></li>
                        <li><Link to="/about" className="hover:text-lime-300 transition">About</Link></li>
                        <li><Link to="/game" className="hover:text-lime-300 transition">Game</Link></li>
                        <li><Link to="/contact" className="hover:text-lime-300 transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Right Section - Contact */}
                <div>
                    <h3 className="text-xl font-semibold text-lime-400">Contact Us</h3>
                    <p className="mt-2 text-gray-300 flex items-center justify-center sm:justify-start">
                        <FaEnvelope className="mr-2" /> support@sketchverse.com
                    </p>
                    <div className="flex justify-center sm:justify-start gap-4 mt-3">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-blue-500 text-2xl hover:text-blue-600 transition" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-blue-400 text-2xl hover:text-blue-500 transition" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-pink-500 text-2xl hover:text-pink-600 transition" />
                        </a>
                    </div>
                </div>

            </div>
        </motion.footer>
    );
}

export default Footer;
