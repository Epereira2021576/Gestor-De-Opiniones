import Post from './post.model.js';
import UserHasComment from '../users/userHasComment.model.js';

export const createPost = async (req, res) => {
  try {
    const { title, category, description } = req.body;
    const post = new Post({
      title,
      category,
      description,
      user: req.user._id,
    });
    await post.save();
    res.status(201).json({
      msg: 'Post created',
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Communicate to the administrator',
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { createdAt } = req.params;
    const { title, category, description } = req.body;

    const post = await Post.findOne({ createdAt });
    if (!post) {
      return res.status(404).json({
        msg: 'Post not found',
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        msg: 'You cannot edit this post',
      });
    }

    post.title = title;
    post.category = category;
    post.description = description;
    await post.save();

    res.status(200).json({
      msg: 'Post edited',
      post,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: 'Communicate to the administrator',
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId, title, description } = req.body;

    const newComment = new UserHasComment({
      user: userId,
      post: postId,
      title,
      description,
    });

    await newComment.save();

    res.status(200).json({
      msg: 'Comment added',
      newComment,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: 'Communicate to the administrator',
    });
  }
};
