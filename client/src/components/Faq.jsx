import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Faq() {
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const faqs = [
        { question: 'How many players can join at max during the game?', answer: 'The game can be played with 10 players at a time.' },
        { question: 'Kya aapko mera future dikh raha hai?', answer: 'nahi na mujhe bhi nahi dikh raaha ' },
        { question: 'kya rajdip ko iss baar internal mai chinu room se nikal dega ?', answer: 'ji Haan !! dooston koi shaq ismai' },
        { question: 'kya ECE wale chutiya hai ?', answer: 'JI ! haaan aap sahi keh rahe hai !!' },
        { question: 'melody itni chocolaty kyun hoti hai', answer: 'kya pata bhai' },
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
                            transition={{ duration: 0.3 }}
                        >
                            {faq.answer}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
