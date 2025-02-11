import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import * as WebPages from './pages/pages'

import './styles/index.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WebPages.Home />} />
            </Routes>
        </Router>
    );
};

export default App;
