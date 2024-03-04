import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title required'],
  },

  category: {
    type: String,
    required: [true, 'Category required'],
  },

  description: {
    type: String,
    required: [true, 'Description required'],
  },

  state: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

postSchema.methods.toJSON = function () {
  const { __v, _id, createdAt, ...post } = this.toObject();
  post.pid = _id;
  return post;
};

module.exports = mongoose.model('Post', postSchema);
