import express from 'express';
import Album from '../models/Album.js';

const router = express.Router();

// GET all albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one album
router.get('/:id', getAlbum, (req, res) => {
    res.json(res.album);
});

// CREATE an album
router.post('/', async (req, res) => {
    const { title, artist, description, songs } = req.body;

    try {
        const album = new Album({
            title,
            artist,
            description,
            songs
        });

        const newAlbum = await album.save();
        res.status(201).json(newAlbum);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// UPDATE an album
router.put('/:id', getAlbum, async (req, res) => {
    const { title, artist, description, songs } = req.body;

    if (title != null) {
        res.album.title = title;
    }
    if (artist != null) {
        res.album.artist = artist;
    }
    if (description != null) {
        res.album.description = description;
    }
    if (songs != null) {
        res.album.songs = songs;
    }

    try {
        const updatedAlbum = await res.album.save();
        res.json(updatedAlbum);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an album
router.delete('/:id', getAlbum, async (req, res) => {
    try {
        await res.album.remove();
        res.json({ message: 'Deleted Album' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getAlbum(req, res, next) {
    let album;
    try {
        album = await Album.findById(req.params.id);
        if (album == null) {
            return res.status(404).json({ message: 'Cannot find album' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.album = album;
    next();
}

export default router;
