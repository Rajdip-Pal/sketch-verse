import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Card({ image, imageAbout, heading, content, buttonField, buttonLink }) {
    return (
        <React.Fragment>
            <div className="flex flex-col justify-center border-4 border-lime-500 rounded-xl p-5 md:w-1/2 lg:w-1/2 xl:w-1/4 m-10">
                <div className="flex justify-center my-8 h-[50%]">
                    <img className="rounded-xl w-[90%]  border-4 border-lime-500" src={image} alt={`${imageAbout}`} />
                </div>
                <div className="align-super">
                    <h1 className="text-3xl text-lime-500 font-bold font-kumar">{heading}</h1>
                    <p className="text-left m-4 text-gray-300 text-lg">{content}</p>
                </div>
                <div className="mt-auto flex justify-center">
                    <Link to={buttonLink}>
                        <button className="w-[100%] mb-5 px-10 py-2 text-wrap font-kotta text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90 ">
                            {buttonField}
                        </button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}

Card.propTypes = {
    image: PropTypes.string.isRequired,
    imageAbout: PropTypes.string,
    heading: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired | PropTypes.element.isRequired,
    buttonField: PropTypes.string.isRequired,
};
