import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistList = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/artists');
                setArtists(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) {
        return <p>Loading artists...</p>;
    }

    if (error) {
        return <p>Error fetching artists: {error.message}</p>;
    }

    return (
        <div>
            <h1>Artists</h1>
            <ul>
                {artists.map(artist => (
                    <li key={artist._id}>
                        <h2>{artist.name}</h2>
                        <p>{artist.bio}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArtistList;
