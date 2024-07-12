import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/HomePage';
import AlbumPage from './components/AlbumPage';

const App = () => {
    return (
        <Router>
            <div>
                {/* <h1>Music Library</h1> */}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/albums" element={<AlbumPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
