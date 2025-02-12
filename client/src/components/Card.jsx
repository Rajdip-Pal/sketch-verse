import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Card({ image, imageAbout, heading, content, buttonField, buttonLink }) {
    return (
        <React.Fragment>
            <div className="container flex-col justify-center border-4 border-lime-500 rounded-xl p-5 w-[650px] h-[750px] m-10">
                <div className="flex justify-center my-8 h-[50%]">
                    <img className="rounded-xl w-[90%]  border-4 border-lime-500" src={image} alt={`${imageAbout}`} />
                </div>
                <div className="align-super">
                    <h1 className="text-3xl text-lime-500 font-bold font-kumar">{heading}</h1>
                    <p className="text-left m-4 text-gray-300 text-lg">{content}</p>
                </div>
                <div className="flex-1 justify-center align-middle bottom-2">
                    <Link to={buttonLink}>
                        <button className="px-10 py-2 font-kotta text-3xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90 ">
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
