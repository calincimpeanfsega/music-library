import React from 'react';
import { Link } from 'react-router-dom';
import { RiHome2Fill, RiAlbumFill } from 'react-icons/ri'; 
import './Navbar.css'; 

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="nav-item">
                <RiHome2Fill className="nav-icon" />
                <span className="nav-text">Home</span>
            </Link>
            <Link to="/albums" className="nav-item">
                <RiAlbumFill className="nav-icon" />
                <span className="nav-text">Albums</span>
            </Link>
        </div>
    );
};

export default Navbar;
