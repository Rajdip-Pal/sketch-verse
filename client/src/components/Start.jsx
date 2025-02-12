import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Start() {
    const [showTour, setShowTour] = useState(false);

    return (
        <div className="flex items-center justify-center h-screen text-white relative">
            <div className='text-2xl text-center'>
                <motion.h1 
                    className='text-6xl text-lime-500 font-bold p-6 font-kumar'
                >
                    Sketch Verse
                </motion.h1>
                
                {!showTour && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-5xl pb-7 font-kotta">
                            <div className='pb-2'>Sketch, play, and express,</div>
                            because creativity has no limits on 
                            <span className="text-lime-500 px-2 rounded-md">Sketch verse!</span>
                        </p>
                        <p className='text-gray-400 font-nixie font-bold'>
                            <div>A collaborative website where you can draw</div> 
                            and create alongside others on a shared canvas.
                        </p>
                    </motion.div>
                )}
                
                {showTour && (
                    <motion.div 
                        className="flex gap-6 mt-10"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <button className='px-6 py-2 text-2xl rounded-3xl bg-white text-black hover:bg-gray-300 active:scale-90'>Whiteboard</button>
                        <button className='px-6 py-2 text-2xl rounded-3xl bg-blue-500 text-white hover:bg-blue-700 active:scale-90'>Game</button>
                        <button className='px-6 py-2 text-2xl rounded-3xl bg-purple-500 text-white hover:bg-purple-700 active:scale-90'>Jamverse</button>
                    </motion.div>
                )}

                {!showTour && (
                    <button 
                        className='px-10 py-2 absolute bottom-8 right-8 font-kotta text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90'
                        onClick={() => setShowTour(true)}
                    >
                        Start tour
                    </button>
                )}
            </div>
        </div>
    );
}
