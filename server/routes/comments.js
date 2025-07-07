const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:postId', auth, async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    author: req.user.id,
    post: req.params.postId,
  });
  await comment.save();
  res.status(201).json(comment);
});

router.delete('/:id', auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (comment.author.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Comment deleted' });
});

module.exports = router;


