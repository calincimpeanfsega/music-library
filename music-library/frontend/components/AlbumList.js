// src/components/AlbumList.js

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
                        <h2>{album.title}</h2>
                        <p>Artist: {album.artist}</p>
                        <p>Release Year: {album.year}</p>
                        <p>{album.description}</p>
                        <ul>
                            {album.songs.map((song, index) => (
                                <li key={index}>{song}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlbumList;
