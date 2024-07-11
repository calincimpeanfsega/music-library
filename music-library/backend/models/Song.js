// models/Song.js

import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    length: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String }
});

const Song = mongoose.model('Song', songSchema);

export default Song;
