import User from '../users/user.model.js';

export const emailExists = async (email = '') => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`The email ${email} is already registered`);
  }
};

export const userExistsById = async (id = '') => {
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`A user with the ID: ${id} does not exist`);
  }
};
