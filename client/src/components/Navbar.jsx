import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function FixedTopRight({ path, children }) {
    return (
        <React.Fragment>
            <nav className="md:flex hidden justify-between">
                <div></div>
                <Link to={path}>
                    <div className="xl:text-3xl md:text-2xl text-4xl text-lime-500 font-bold p-6 font-kumar md:mx-5 my-5">{children}</div>
                </Link>
            </nav>
            <nav className="flex md:hidden justify-between">
                <div></div>
                <Link to={path}>
                    <div className="text-lime-500 font-bold p-6 font-kumar md:mx-5 md:my-5">{children}</div>
                </Link>
            </nav>
        </React.Fragment>
    );
}

FixedTopRight.propTypes = {
    path: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

FixedTopRight.defaultProps = {
    path: '/',
    children: 'Sketc Verse',
};

export function FixedTopLeft({ path, children }) {
    return (
        <React.Fragment>
            <nav className="md:flex hidden justify-between">
                <Link to={path}>
                    <div className="xl:text-3xl md:text-2xl text-4xl text-lime-500 font-bold p-6 font-kumar md:mx-5 my-5">{children}</div>
                </Link>
            </nav>
            <nav className="flex md:hidden justify-between">
                <Link to={path}>
                    <div className="text-lime-500 font-bold p-6 font-kumar md:mx-5 md:my-5">{children}</div>
                </Link>
            </nav>
        </React.Fragment>
    );
}

FixedTopLeft.propTypes = {
    path: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

FixedTopLeft.defaultProps = {
    path: '/',
    children: 'Sketc Verse',
};
