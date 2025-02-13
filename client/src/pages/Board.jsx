import React from 'react';
import { motion } from 'framer-motion';

import Card from '../components/Card';
import singleDrawLogo from '../assets/images/singleDrawLogo.png';
import colaboarationLogo from '../assets/images/colaboarationLogo.png';


export default function Board() {
    document.title = 'Sketch Verse | Whiteboard';

    const cardData = [
        {
            img: singleDrawLogo,
            imageAbout: 'single draw',
            heading: 'Draw',
            content: `Unleash your creativity on the canvas—sketch, doodle, and design your masterpiece effortlessly`,
            buttonField: 'Explore',
            buttonLink: '/whiteboard',
        },
        {
            img: colaboarationLogo,
            imageAbout: 'colaboration image',
            heading: 'Draw with friends',
            content: (
                <React.Fragment>
                    Unleash your creativity on the canvas—sketch, doodle, and design your masterpiece effortlessly
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

                    <motion.div className="md:flex gap-6" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        {buildCards(cardData)}
                    </motion.div>
                </div>
            </div>
        </React.Fragment>
    );
}

