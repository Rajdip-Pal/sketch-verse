// Importing necessary dependencies from React, react-router-dom, and PropTypes
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// FixedTopRight component for a top-right navigation bar
export function FixedTopRight({ id, className, path, headline, children }) {
    return (
        <React.Fragment>
            {/* Navigation for medium and larger screens */}
            <nav id={id} className={` ${className} md:flex hidden justify-between absolute w-full top-0 right-0`}>
                <div className="p-6 md:mx-5 md:my-5">{children}</div>
                <Link to={path}>
                    <div className="xl:text-3xl md:text-2xl text-4xl text-lime-500 font-bold p-6 font-eater md:mx-5 my-5">{headline}</div>
                </Link>
            </nav>
            {/* Navigation for smaller screens */}
            <nav id={id} className={` ${className} flex md:hidden justify-between absolute w-full top-0 right-0`}>
                <div className="p-6 md:mx-5 md:my-5">{children}</div>
                <Link to={path}>
                    <div className="text-lime-500 font-bold p-6 font-eater md:mx-5 md:my-5">{headline}</div>
                </Link>
            </nav>
        </React.Fragment>
    );
}

// PropTypes for FixedTopRight component
FixedTopRight.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    path: PropTypes.string,
    headline: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

// Default props for FixedTopRight component
FixedTopRight.defaultProps = {
    path: '/',
    headline: 'Sketch Verse',
};

// FixedTopLeft component for a top-left navigation bar
export function FixedTopLeft({ id, className, path, headline, children }) {
    return (
        <React.Fragment>
            {/* Navigation for medium and larger screens */}
            <nav id={id} className={`${className} md:flex hidden justify-between absolute w-full top-0 left-0`}>
                <Link to={path}>
                    <div className="xl:text-3xl md:text-2xl text-4xl text-lime-500 font-bold p-6 font-eater md:mx-5 my-5">{headline}</div>
                </Link>
                <div className="p-6 md:mx-5 md:my-5">{children}</div>
            </nav>
            {/* Navigation for smaller screens */}
            <nav id={id} className={` ${className} flex md:hidden justify-between absolute w-full top-0 left-0`}>
                <Link to={path}>
                    <div className="text-lime-500 font-bold p-6 font-eater md:mx-5 md:my-5">{headline}</div>
                </Link>
                <div className="p-6 md:mx-5 md:my-5">{children}</div>
            </nav>
        </React.Fragment>
    );
}

// PropTypes for FixedTopLeft component
FixedTopLeft.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    path: PropTypes.string,
    headline: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

// Default props for FixedTopLeft component
FixedTopLeft.defaultProps = {
    path: '/',
    headline: 'Sketch Verse',
};
