// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/HomePage';

const App = () => {
    return (
        <Router>
            <div>
                {/* <h1>Music Library</h1> */}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
