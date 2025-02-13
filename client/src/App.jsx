import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as WebPages from './pages/pages';

import './styles/App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WebPages.Home />} />
                <Route path="/start" element={<WebPages.Start />} />
                <Route path="/about" element={<WebPages.About />} />
                <Route path="/contact" element={<WebPages.Contact />} />
                <Route path="/whiteboard" element={<WebPages.Board />} />
                <Route path="/game" element={<WebPages.Game />} />
                <Route path="/singledraw" element={<WebPages.Singledraw />} />
                
            </Routes>
        </Router>
    );
};

export default App;
