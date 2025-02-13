import React from 'react';
import { motion } from 'framer-motion';

import Card from '../components/Card';

import gameLogo from '../assets/images/demo.jpeg';
import whiteBoardLogo from '../assets/images/demo.jpg';

export default function Start() {
    document.title = 'Sketch Verse | Explore';

    const cardData = [
        {
            img: whiteBoardLogo,
            imageAbout: 'Demo Image',
            heading: 'WhiteBoard',
            content: `Unleash your creativity and teamwork with a powerful, real-time online whiteboard. Whether you're brainstorming ideas, teaching a class, or working on a project, our intuitive whiteboard makes collaboration easy and efficient.`,
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

    const buildCards = function (cardData) {
        return Array.from(cardData).map((card, index) => (
            <Card
                key={index}
                image={card.img}
                imageAbout={card.imageAbout}
                heading={card.heading}
                content={card.content}
                buttonField={card.buttonField}
                buttonLink={card.buttonLink}
            />
        ));
    };

    return (
        <React.Fragment>
            <div className="flex items-center justify-center h-screen text-white relative">
                <div className="text-2xl text-center">
                    <motion.h1 className="text-6xl text-lime-500 font-bold p-6 font-kumar">Sketch Verse</motion.h1>

                    <motion.div className="md:flex justify-center gap-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        {buildCards(cardData)}
                    </motion.div>
                </div>
            </div>
        </React.Fragment>
    );
}
