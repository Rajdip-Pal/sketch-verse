import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Card({ image, imageAbout, imageWidth, heading, content, buttonField, buttonLink }) {
    return (
        <motion.div
            className="backdrop-blur-xl flex flex-col justify-center border-4 border-lime-500 rounded-xl p-5 md:w-1/2 lg:w-1/2 xl:w-1/4 m-10  shadow-2xl shadow-black"
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(10px)' }}
            transition={{ duration: 4, delay: 0.01, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}>
            <div className="flex justify-center my-8 h-[50%]">
                <img className="rounded-xl w-[90%]  border-4 border-lime-500" src={image} alt={`${imageAbout}`} width={imageWidth} />
            </div>
            <div className="align-super">
                <h1 className="text-3xl text-lime-500 font-bold font-eater">{heading}</h1>
                <p className="text-left m-4 text-gray-300 text-lg">{content}</p>
            </div>
            <div className="mt-auto flex justify-center">
                <Link to={buttonLink}>
                    <button className="w-[100%] mb-5 px-10 py-2 text-wrap font-kota text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90 ">
                        {buttonField}
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}

Card.propTypes = {
    image: PropTypes.string.isRequired,
    imageAbout: PropTypes.string,
    imageWidth: PropTypes.number,
    heading: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired | PropTypes.element.isRequired,
    buttonField: PropTypes.string.isRequired,
};
