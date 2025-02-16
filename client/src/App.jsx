import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
                <Route path="/multidraw" element={<WebPages.Multidraw />} />
                <Route path="/aboutus" element={<WebPages.AboutUs />} />
                <Route path="/gameareana" element={<WebPages.GameArina />} />
            </Routes>
        </Router>
    );
};

export default App;
