import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Faq() {
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const faqs = [
        { question: '1. What is SketchVerse?', answer: 'SketchVerse is an interactive multiplayer drawing and guessing game where players take turns drawing a word while others guess it. The faster you guess, the more points you earn!' },
        { question: '2. How many players can participate in a game?', answer: 'A game session in SketchVerse can have a maximum of 5 players at a time.' },
        { question: '3. How do I join a game?', answer: 'Enter a username and select an avatar. Click "Join Game", enter a Game ID, and start playing!' },
        { question: '4. Can I create my own game room?', answer: 'Yes! Click "Create Room", and a unique Game ID will be generated for you. Share this ID with friends to invite them.' },
        { question: '5. How is the winner determined?', answer: 'The player with the highest score at the end of all rounds wins! Points are awarded based on how quickly you guess the correct word.' },
        { question: '6. Is SketchVerse free to play?', answer: 'Yes! SketchVerse is completely free to play and enjoy with friends.' },
        { question: '7. Can I play on mobile?', answer: 'Yes, SketchVerse is optimized for both desktop and mobile devices.' }
    ];

    return (
        <div className="mt-20 w-3/4 mx-auto text-white">
            <h2 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <motion.div key={index} className="bg-gray-800 p-4 rounded-xl" layout>
                        <button className="w-full text-left text-2xl font-bold text-white" onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}>
                            {faq.question}
                        </button>
                        <motion.p
                            className="mt-2 text-gray-300"
                            initial={{ opacity: 0, height: 0 }}
                            animate={expandedFAQ === index ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}>
                            {faq.answer}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
