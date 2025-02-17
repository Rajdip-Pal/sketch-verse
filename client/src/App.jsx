import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { v4 as uuidV4 } from "uuid";

import * as WebPages from './pages/pages';

import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WebPages.Home />} />
                <Route path="/start" element={<WebPages.Start />} />
                <Route path="/tour" element={<Navigate to="/start" />} />
                <Route path="/contact" element={<WebPages.Contact />} />
                <Route path="/whiteboard" element={<WebPages.Board />} />
                <Route path="/board" element={<Navigate to="/whiteboard" />} />
                <Route path="/game" element={<WebPages.Game />} />
                <Route path="/games" element={<Navigate to="/game" />} />
                <Route path="/singledraw" element={<WebPages.Singledraw />} />
                <Route path="/multidraw" element={<Navigate to={`/board/${uuidV4()}`} />} />
                <Route path="/aboutus" element={<WebPages.AboutUs />} />
                <Route path="/gameareana" element={<WebPages.GameArina />} />
                <Route path="/board/:roomId" element={<WebPages.Multidraw />} />
                <Route path="/lobby" element={<WebPages.Lobby />} />
            </Routes>
        </Router>
    );
};

export default App;
