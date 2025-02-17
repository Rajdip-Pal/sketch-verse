import React from 'react';
import Faq from '../components/Faq';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Footer from '../components/Footer';

const contributors = [
    {
        name: 'Suvayu',
        image: '/contributors/suvhayu.jpg',  // Update with actual image paths
        github: 'https://github.com/SuvayuN',
        linkedin: 'https://www.linkedin.com/in/suvayu-nandy/'
    },
    {
        name: 'Rajdip',
        image: '/contributors/rajdip.jpg',
        github: 'https://github.com/Rajdip-Pal',
        linkedin: 'https://www.linkedin.com/in/rajdip-pal/'
    },
    {
        name: 'Prajwal',
        image: '/contributors/prajwal.jpg',
        github: 'https://github.com/prajwallakra',
        linkedin: 'https://www.linkedin.com/in/prajwal-lakra/'
    }
];

function About() {
    return (
        <React.Fragment>
            <Faq />
        </React.Fragment>
    );
}

export default About;
