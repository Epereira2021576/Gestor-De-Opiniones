import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: { type: String, required: [true, 'Username is required'] },

  email: {
    type: String,
    required: [true, 'Email is required and should be unique'],
    unique: true,
  },

  password: { type: String, required: [true, 'Password required'] },

  state: { type: Boolean, default: true },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default mongoose.model('User', UserSchema);
