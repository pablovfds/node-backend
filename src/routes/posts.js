const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(400).json(error)
    }
});

router.post('/posts', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.json(post);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/posts/:id', async (req, res) => {    
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(400).json(error)
    }
});

router.delete('/posts/:id', async (req, res) => {
    
    try {
        await Post.findByIdAndRemove(req.params.id);
        res.json({message: 'Post deleted!'});
    } catch (error) {
        res.status(400).json(error)
    }
});

router.patch('/posts/:id', async (req, res) => {
    
    postSet = {};

    if (req.body.title) postSet.title = req.body.title;

    if (req.body.description) postSet.description = req.body.description;
    
    try {
        const post = await Post.updateOne(
            {_id: req.params.id}, 
            {
                $set: postSet
            }
        );

        res.json(post);
    } catch (error) {
        res.status(400).json(error)
    }
});

module.exports = router;