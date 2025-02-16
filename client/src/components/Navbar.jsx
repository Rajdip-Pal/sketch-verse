import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function FixedTopRight({ id, className, path, headline, children }) {
    return (
        <React.Fragment>
            <nav id={id} className={` ${className} md:flex hidden justify-between absolute w-full top-0 right-0`}>
                <div className="p-6 md:mx-5 md:my-5">{children}</div>
                <Link to={path}>
                    <div className="xl:text-3xl md:text-2xl text-4xl text-lime-500 font-bold p-6 font-eater md:mx-5 my-5">{headline}</div>
                </Link>
            </nav>
            <nav id={id} className={` ${className} flex md:hidden justify-between absolute w-full top-0 right-0`}>
                <div className="p-6 md:mx-5 md:my-5">{children}</div>
                <Link to={path}>
                    <div className="text-lime-500 font-bold p-6 font-eater md:mx-5 md:my-5">{headline}</div>
                </Link>
            </nav>
        </React.Fragment>
    );
}

FixedTopRight.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    path: PropTypes.string,
    headline: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

FixedTopRight.defaultProps = {
    path: '/',
    headline: 'Sketc Verse',
};

export function FixedTopLeft({ id, className, path, headline, children }) {
    return (
        <React.Fragment>
            <nav id={id} className={`${className} md:flex hidden justify-between absolute w-full top-0 left-0`}>
                <Link to={path}>
                    <div className="xl:text-3xl md:text-2xl text-4xl text-lime-500 font-bold p-6 font-eater md:mx-5 my-5">{headline}</div>
                </Link>
                <div className="p-6 md:mx-5 md:my-5">{children}</div>
            </nav>
            <nav id={id} className={` ${className} flex md:hidden justify-between absolute w-full top-0 left-0`}>
                <Link to={path}>
                    <div className="text-lime-500 font-bold p-6 font-eater md:mx-5 md:my-5">{headline}</div>
                </Link>
                <div className="p-6 md:mx-5 md:my-5">{children}</div>
            </nav>
        </React.Fragment>
    );
}

FixedTopLeft.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    path: PropTypes.string,
    headline: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

FixedTopLeft.defaultProps = {
    path: '/',
    headline: 'Sketc Verse',
};
