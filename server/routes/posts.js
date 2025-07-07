const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'username');
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "_id username");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, content, image } = req.body;
  const post = new Post({ title, content, image, author: req.user.id });
  await post.save();
  res.status(201).json(post);
});

router.put('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

router.post('/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const alreadyLiked = post.likes.includes(req.user.id);
  if (alreadyLiked) {
    post.likes.pull(req.user.id);
  } else {
    post.likes.push(req.user.id);
  }
  await post.save();
  const updatedPost = await Post.findById(req.params.id).populate('author', '_id username');
  res.json(updatedPost);

});


module.exports = router;
