import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: String,
    length: String
});

const albumSchema = new mongoose.Schema({
    title: String,
    songs: [songSchema],
    artist: String,
    description: String
});

const artistSchema = new mongoose.Schema({
    name: String,
    albums: [albumSchema]
});

const Album = mongoose.model('Album', albumSchema);
export default Album;
