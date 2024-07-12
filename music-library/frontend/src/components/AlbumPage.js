import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AlbumPage = () => {
    const [albums, setAlbums] = useState([]);
    const [newAlbums, setNewAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateMode, setIsCreateMode] = useState(false);
    const [newAlbum, setNewAlbum] = useState({ title: '', artist: '', description: '', songs: [{ title: '', length: '' }] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/albums');
            const originalAlbums = response.data.filter(album => !album.title); // Assuming original albums don't have 'title' key
            const newAlbums = response.data.filter(album => album.title); // Assuming new albums have 'title' key
            setAlbums(originalAlbums);
            setNewAlbums(newAlbums);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    const openModal = (album = null) => {
        setSelectedAlbum(album);
        setIsCreateMode(!album);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAlbum(null);
        setIsModalOpen(false);
        setIsCreateMode(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isCreateMode) {
            setNewAlbum({ ...newAlbum, [name]: value });
        } else {
            setSelectedAlbum({ ...selectedAlbum, [name]: value });
        }
    };

    const handleSongChange = (index, e) => {
        const { name, value } = e.target;
        const songs = isCreateMode ? [...newAlbum.songs] : [...selectedAlbum.songs];
        songs[index][name] = value;
        if (isCreateMode) {
            setNewAlbum({ ...newAlbum, songs });
        } else {
            setSelectedAlbum({ ...selectedAlbum, songs });
        }
    };

    const addNewSongField = () => {
        const songs = isCreateMode ? [...newAlbum.songs, { title: '', length: '' }] : [...selectedAlbum.songs, { title: '', length: '' }];
        if (isCreateMode) {
            setNewAlbum({ ...newAlbum, songs });
        } else {
            setSelectedAlbum({ ...selectedAlbum, songs });
        }
    };

    // const handleCreateAlbum = async () => {
    //     try {
    //         await axios.post('http://localhost:5000/api/albums', newAlbum);
    //         setNewAlbum({ title: '', artist: '', description: '', songs: [{ title: '', length: '' }] });
    //         fetchAlbums();
    //         closeModal();
    //     } catch (err) {
    //         setError(err);
    //     }
    // };

    // const handleUpdateAlbum = async () => {
    //     try {
    //         if (isCreateMode) {
    //             await axios.post('http://localhost:5000/api/albums', newAlbum); // Assuming this creates a new album
    //         } else {
    //             const { _id, ...albumData } = selectedAlbum; // Destructure _id and exclude it from the payload
    //             await axios.put(`http://localhost:5000/api/albums/${_id}`, albumData); // Assuming this updates an existing album
    //         }
    //         fetchAlbums();
    //         closeModal();
    //     } catch (err) {
    //         setError(err);
    //     }
    // };
    const handleUpdateAlbum = async () => {
        try {
            const { _id, ...albumData } = selectedAlbum; // Destructure _id and exclude it from the payload
            await axios.put(`http://localhost:5000/api/albums/${_id}`, albumData); // Use PUT method for updating an existing album
            fetchAlbums();
            closeModal();
        } catch (err) {
            setError(err);
        }
    };
    
    const handleCreateAlbum = async () => {
        try {
            await axios.post('http://localhost:5000/api/albums', newAlbum); // Use POST method for creating a new album
            setNewAlbum({ title: '', artist: '', description: '', songs: [{ title: '', length: '' }] });
            fetchAlbums();
            closeModal();
        } catch (err) {
            setError(err);
        }
    };
    

    const handleDeleteAlbum = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/albums/${id}`);
            fetchAlbums();
        } catch (err) {
            setError(err);
        }
    };

    if (loading) {
        return <p>Loading albums...</p>;
    }

    if (error) {
        return <p>Error fetching albums: {error.message}</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>All Albums</h1>
            <div style={styles.albumList}>
                <div style={styles.albumBox} onClick={() => openModal(null)}>
                    <h2 style={styles.albumTitle}>+ Add Album</h2>
                </div>
                {/* Display original albums */}
                {albums.map(artist =>
                    artist.albums.map(album => (
                        <div key={album.title} style={styles.albumBox} onClick={() => openModal({ ...album, artist: artist.name })}>
                            <h2 style={styles.albumTitle}>{album.title}</h2>
                            <p style={styles.albumInfo}>Artist: {artist.name}</p>
                        </div>
                    ))
                )}
                {/* Display new albums */}
                {newAlbums.map(album => (
                    <div key={album.title} style={styles.albumBox} onClick={() => openModal({ ...album, artist: album.artist })}>
                        <h2 style={styles.albumTitle}>{album.title}</h2>
                        <p style={styles.albumInfo}>Artist: {album.artist}</p>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Album Details"
                    style={modalStyles}
                >
                    {isCreateMode ? (
                        <>
                            <h2>Create New Album</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newAlbum.title}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="artist"
                                placeholder="Artist"
                                value={newAlbum.artist}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={newAlbum.description}
                                onChange={handleInputChange}
                                style={styles.textarea}
                            ></textarea>
                            <h3>Songs</h3>
                            {newAlbum.songs.map((song, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Song Title"
                                        value={song.title}
                                        onChange={(e) => handleSongChange(index, e)}
                                        style={styles.input}
                                    />
                                    <input
                                        type="text"
                                        name="length"
                                        placeholder="Song Length"
                                        value={song.length}
                                        onChange={(e) => handleSongChange(index, e)}
                                        style={styles.input}
                                    />
                                </div>
                            ))}
                            <button onClick={addNewSongField} style={styles.button}>+ Add Song</button>
                            <button onClick={handleCreateAlbum} style={styles.button}>Save Album</button>
                        </>
                    ) : (
                        <>
                            <h2>{selectedAlbum.title}</h2>
                            <p>Artist: {selectedAlbum.artist}</p>
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={selectedAlbum.description}
                                onChange={handleInputChange}
                                style={styles.textarea}
                            ></textarea>
                            <h3>Songs</h3>
                            {selectedAlbum.songs.map((song, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Song Title"
                                        value={song.title}
                                        onChange={(e) => handleSongChange(index, e)}
                                        style={styles.input}
                                    />
                                    <input
                                        type="text"
                                        name="length"
                                        placeholder="Song Length"
                                        value={song.length}
                                        onChange={(e) => handleSongChange(index, e)}
                                        style={styles.input}
                                    />
                                </div>
                            ))}
                            <button onClick={addNewSongField} style={styles.button}>+ Add Song</button>
                            <button onClick={handleUpdateAlbum} style={styles.button}>Update Album</button>
                        </>
                    )}
                    <button onClick={closeModal} style={styles.closeButton}>Close</button>
                </Modal>
            )}
        </div>
    );
};

// Inline styles
const styles = {
    container: {
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
    },
    heading: {
        textAlign: 'center',
    },
    albumList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridGap: '20px',
        marginTop: '20px',
    },
    albumBox: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    albumTitle: {
        fontSize: '1.2rem',
        marginBottom: '10px',
    },
    albumInfo: {
        fontSize: '1rem',
        color: '#666',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        fontSize: '1rem',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        fontSize: '1rem',
        minHeight: '100px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginRight: '10px',
    },
    closeButton: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '10px',
    },
};

const modalStyles = {
    content: {
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
    },
};

export default AlbumPage;
