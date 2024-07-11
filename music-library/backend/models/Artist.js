import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: String,
    length: String
});

const albumSchema = new mongoose.Schema({
    title: String,
    songs: [songSchema],
    description: String
});

const artistSchema = new mongoose.Schema({
    name: String,
    albums: [albumSchema]
});

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;
