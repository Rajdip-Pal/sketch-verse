import React from 'react';
import * as Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

import luffy from '../assets/images/luffy.jpg';
import zoro from '../assets/images/zoro.jpeg';
import sanji from '../assets/images/sanji.jpg';
import nami from '../assets/images/nami.jpg';
import chopper from '../assets/images/chopper.jpeg';
import robin from '../assets/images/Robin.jpg';
import roger from '../assets/images/Roger.jpg';
import whitebeard from '../assets/images/Whitebeard.jpg';
import ace from '../assets/images/ace.jpeg';
import shanks from '../assets/images/shanks.jpeg';
import akainu from '../assets/images/akainu.jpg';

const images = [luffy, zoro, sanji, nami, chopper, robin, roger, whitebeard, ace, shanks, akainu];

const languages = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Italian', label: 'Italian' },
];

export default function Game() {
    document.title = 'Sketch Verse | Game';

    const [username, setUsername] = React.useState('');
    const [language, setLanguage] = React.useState(languages[0].value);
    const [avatar, setAvatar] = React.useState(luffy);

    const buildAvatars = function (images) {
        return Array.from(images).map((image, index) => (
            <button
                className="border-2 border-transparent"
                onClick={() => {
                    document.querySelectorAll('.avatars').forEach(avatar => avatar.classList.replace('border-blue-500', 'border-transparent'));
                    document.getElementById(`avatar-${index}`).classList.replace('border-transparent', 'border-blue-500');
                    setAvatar(document.getElementById(`avatar-${index}`).src);
                }}>
                <img id={`avatar-${index}`} className="avatars m-1 border-2 border-transparent rounded" src={image} alt="Avatar" key={index} width={50} height={50} />
            </button>
        ));
    };

    const buildLanguageOptions = function (language_options) {
        return language_options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
        ));
    };

    return (
        <React.Fragment>
            <Navbar.FixedTopRight path="/" children={'Sketch Verse'} />
            <div>
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={e => {
                            setUsername(e.target.value);
                        }}
                        placeholder="Username"
                    />
                    <select
                        value={language}
                        onChange={e => {
                            setLanguage(e.target.value);
                        }}>
                        {buildLanguageOptions(languages)}
                    </select>
                </div>
                <div>
                    <div className="w-90 overflow-hidden">
                        <div className="inline-flex w-[80%]">{buildAvatars(images)}</div>
                    </div>
                </div>
                <div>
                    <button>Join Game</button>
                    <button>Create Room</button>
                </div>

                <img className="avatars m-1 border-2 border-transparent rounded" src={avatar} alt="Avatar" width={50} height={50} />
            </div>
        </React.Fragment>
    );
}
