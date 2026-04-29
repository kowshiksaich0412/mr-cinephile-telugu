import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const exists = await Post.findById(postId);
  if (!exists) return res.status(404).json({ message: "Post not found" });

  const comment = await Comment.create({
    post: postId,
    name: req.body.name,
    message: req.body.message
  });

  res.status(201).json(comment);
};

export const getComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId, approved: true }).sort({
    createdAt: -1
  });
  res.json(comments);
};
