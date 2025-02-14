import React from 'react';
import { Link } from 'react-router-dom';

import * as Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';

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
import pikachu from '../assets/images/pikachu.jpeg';

const images = [luffy, zoro, sanji, nami, chopper, robin, roger, whitebeard, ace, shanks, akainu, pikachu];

export default function Game() {
    document.title = 'Sketch Verse | Game';

    const [username, setUsername] = React.useState('');
    const [avatar, setAvatar] = React.useState(luffy);

    const buildAvatars = function (images, size) {
        let avatars = Array.from(images).map((image, index) => (
            <button
                className="border-2 border-transparent"
                onClick={() => {
                    document.querySelectorAll('.avatars').forEach(avatar => avatar.classList.replace('border-lime-500', 'border-transparent'));
                    document.getElementById(`avatar-${index}`).classList.replace('border-transparent', 'border-lime-500');
                    setAvatar(document.getElementById(`avatar-${index}`).src);
                }}>
                <img id={`avatar-${index}`} className="avatars m-1 border-4 border-transparent rounded-xl" src={image} alt="Avatar" key={index} width={100} height={100} />
            </button>
        ));

        const result = [];
        for (let i = 0; i < avatars.length; i += size) {
            result.push(<div className="flex justify-center">{avatars.slice(i, i + size)}</div>);
        }

        return result;
    };

    return (
        <React.Fragment>
            <Navbar.FixedTopRight path="/" children={'Sketch Verse'} />
            <div className="flex justify-center items-center align-middles h-[80%] w-full ">
                <div className="flex flex-col items-center justify-around h-[60%] w-[50%] border-4 border-lime-600 rounded-3xl">
                    <h3 className="text-center text-lime-500 font-bold text-3xl">Choose Avatar :</h3>
                    <div className="flex justify-center align-middle items-center mt-3 md-5">
                        <div className="flex flex-col justify-center w-[80%]">{buildAvatars(images, 7)}</div>
                    </div>
                    <div className="flex items-center justify-center my-5 mx-5">
                        <input
                            id="username"
                            className="w-[80%] focus:outline-none py-3 px-8 text-center transition-none bg-transparent border-b-2 border-lime-500 text-lime-500 font-bold placeholder:font-bold placeholder:text-lime-300 text-2xl mx-5"
                            type="text"
                            value={username}
                            onSelect={() => {
                                document.querySelectorAll('.username').forEach(username => username.classList.replace('border-lime-500', 'border-transparent'));
                                document.getElementById('username').placeholder = username === '' ? 'Username' : '';
                            }}
                            onChange={e => {
                                setUsername(e.target.value);
                            }}
                            placeholder="Username"
                            autoComplete="off"
                            autofill="off"
                            spellCheck="false"
                        />
                    </div>

                    <div className="flex justify-center">
                        <GameCard className="md:min-w-[70%]" image={avatar} userName={username} usersPoints={0} />
                    </div>

                    <div className="flex justify-center my-5 ">
                        <Link to="/game" className="text-center m-1">
                            <button className="text-wrap mb-5 px-8 py-2 font-kotta text-xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90 ">
                                Join Game
                            </button>
                        </Link>
                        <span className="m-3 text-lime-500 text-center text-lg font-kotta"> Or </span>
                        <Link to="/lobby" className="text-center m-1">
                            <button className="text-wrap mb-5 px-8 py-2  font-kotta text-xl rounded-3xl bg-lime-500 text-black hover:bg-green-700 hover:text-white active:scale-90 ">
                                Create Room
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
