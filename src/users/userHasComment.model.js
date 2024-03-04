import mongoose from 'mongoose';

const userHasCommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title required'],
  },
  description: {
    type: String,
    required: [true, 'Description required'],
  },
});

export default mongoose.model('UserHasComment', userHasCommentSchema);
