// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtistList from './components/ArtistList';
import AlbumList from './components/AlbumList';
import Homepage from './components/HomePage';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Music Library</h1>
                <Routes>
                    <Route path="/artists" element={<ArtistList />} />
                    <Route path="/albums" element={<AlbumList />} />
                    <Route path="/home" element={<Homepage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
