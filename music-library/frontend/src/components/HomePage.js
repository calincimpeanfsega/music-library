import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const HomePage = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/albums');
                const albums = response.data;

                // Flatten the albums and their songs into a single array of songs
                const allSongs = albums.reduce((acc, album) => {
                    // Check if the album has 'albums' property, and flatten the songs
                    if (album.albums && album.albums.length > 0) {
                        const albumSongs = album.albums.flatMap(a => {
                            return a.songs.map(song => ({
                                title: song.title,
                                length: song.length,
                                artist: album.name,
                                album: a.title,
                                // description: a.description, // Commented out description
                            }));
                        });
                        acc.push(...albumSongs);
                    }
                    // Check if the album has 'songs' property and flatten them
                    if (album.songs && album.songs.length > 0) {
                        const standaloneSongs = album.songs.map(song => ({
                            title: song.title,
                            length: song.length,
                            artist: album.artist || album.name,
                            album: album.title || 'Single',
                            // description: album.description || '', // Commented out description
                        }));
                        acc.push(...standaloneSongs);
                    }
                    return acc;
                }, []);

                setSongs(allSongs);
                setFilteredSongs(allSongs);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            setFilteredSongs(songs);
        } else {
            setFilteredSongs(songs.filter(song => song.title.toLowerCase().includes(e.target.value.toLowerCase())));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setFilteredSongs(songs.filter(song => song.title.toLowerCase().includes(search.toLowerCase())));
    };

    if (loading) {
        return <p>Loading songs...</p>;
    }

    if (error) {
        return <p>Error fetching songs: {error.message}</p>;
    }

    return (
        <div style={styles.container}>
            <Navbar />
            <h1 style={styles.heading}>All Songs</h1>
            <form onSubmit={handleSearch} style={styles.searchForm}>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search for a song..."
                    style={styles.searchInput}
                />
                <button type="submit" style={styles.searchButton}>Search</button>
            </form>
            <div style={styles.songList}>
                {filteredSongs.map((song, index) => (
                    <div key={index} style={styles.songBox}>
                        <h2 style={styles.songTitle}>{song.title}</h2>
                        <p style={styles.songInfo}>Artist: {song.artist}</p>
                        <p style={styles.songInfo}>Album: {song.album}</p>
                        <p style={styles.songInfo}>Length: {song.length}</p>
                        {/* Commented out description */}
                        {/* <p style={styles.songInfo}>Description: {song.description}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        textAlign: 'center',
    },
    heading: {
        fontSize: '2rem',
        marginBottom: '20px',
        color: '#333',
    },
    searchForm: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px 0 0 5px',
        border: '1px solid #ccc',
        flex: '1',
    },
    searchButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '0 5px 5px 0',
        border: 'none',
        backgroundColor: '#333',
        color: '#fff',
        cursor: 'pointer',
    },
    songList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    songBox: {
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        textAlign: 'left',
    },
    songTitle: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: '#333',
    },
    songInfo: {
        fontSize: '1rem',
        color: '#666',
        marginBottom: '5px',
    },
};

export default HomePage;
