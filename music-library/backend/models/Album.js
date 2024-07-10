const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: String,
    description: String,
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    songs: [String]
});

module.exports = mongoose.model('Album', albumSchema);
