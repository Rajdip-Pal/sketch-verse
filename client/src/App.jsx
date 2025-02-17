import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';
import './styles/App.css';

// Lazy loading components for better performance
const Home = lazy(() => import('./pages/Home'));
const Start = lazy(() => import('./pages/Start'));
const Board = lazy(() => import('./pages/Board'));
const Game = lazy(() => import('./pages/Game'));
const Singledraw = lazy(() => import('./pages/Singledraw'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const GameArena = lazy(() => import('./pages/GameArena'));
const Multidraw = lazy(() => import('./pages/Multidraw'));
const Lobby = lazy(() => import('./pages/Lobby'));
const LoadingAnimation = lazy(() => import('./components/LoadingAnimation'));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingAnimation />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/start" element={<Start />} />
                    <Route path="/tour" element={<Navigate to="/start" />} />
                    <Route path="/whiteboard" element={<Board />} />
                    <Route path="/board" element={<Navigate to="/whiteboard" />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/games" element={<Navigate to="/game" />} />
                    <Route path="/singledraw" element={<Singledraw />} />
                    <Route path="/multidraw" element={<Navigate to={`/board/${uuidV4()}`} />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/gamearena" element={<GameArena />} />
                    <Route path="/board/:roomId" element={<Multidraw />} />
                    <Route path="/lobby" element={<Lobby />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
