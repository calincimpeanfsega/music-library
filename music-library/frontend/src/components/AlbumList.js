import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlbumList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/albums');
                setAlbums(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    if (loading) {
        return <p>Loading albums...</p>;
    }

    if (error) {
        return <p>Error fetching albums: {error.message}</p>;
    }

    return (
        <div>
            <h1>Albums</h1>
            <ul>
                {albums.map(album => (
                    <li key={album._id}>
                        <h2>{album.name}</h2>
                        <ul>
                            {album.albums.map((subAlbum, index) => (
                                <li key={index}>
                                    <h3>{subAlbum.title}</h3>
                                    <p>{subAlbum.description}</p>
                                    <ul>
                                        {subAlbum.songs.map((song, idx) => (
                                            <li key={idx}>
                                                {song.title} - {song.length}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumList;
