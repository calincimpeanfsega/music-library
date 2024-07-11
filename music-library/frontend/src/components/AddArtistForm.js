import React, { useState } from 'react';
import axios from 'axios';

const AddArtistForm = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newArtist = { name };
        await axios.post('/api/artists', newArtist);
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Artist Name"
            />
            <button type="submit">Add Artist</button>
        </form>
    );
};

export default AddArtistForm;
