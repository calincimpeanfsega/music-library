import express from 'express';
import Album from '../models/Album.js';

const router = express.Router();

// Get all albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new album
router.post('/', async (req, res) => {
    const album = new Album({
        title: req.body.title,
        songs: req.body.songs,
        description: req.body.description
    });

    try {
        const newAlbum = await album.save();
        res.status(201).json(newAlbum);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Other CRUD operations can go here...

export default router;
