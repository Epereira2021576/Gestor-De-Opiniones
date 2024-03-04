import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from './user.model.js';
import { jwtGenerate } from '../helpers/generate-jwt.js';

//Login method for users
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); //Find the user
    if (!user) return response.status(400).json({ msg: 'User not found' }); //If the user is not found
    if (!user.state)
      return response
        .status(400)
        .json({ msg: 'User deleted from the database' });
    const passCompare = bcryptjs.compareSync(password, user.password); //Compare the password
    if (!passCompare)
      return response.status(400).json({ msg: 'Incorrect password' });
    const token = await jwtGenerate(user.id); //Generate the token
    res.status(200).json({ msg: 'Logged In!', user, token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: 'Error' });
  }
};

//Post method
export const userPost = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res.status(200).json({ user });
};

//Get method
export const userGet = async (req, res) => {
  const { limit, from } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.status(200).json({ total, users });
};

//Put method
export const userPut = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, oldPass, newPass } = req.body;
    const userAuth = req.user;
    const idMatch = userAuth._id.toString() === id;
    const authPermit = userAuth.role === 'USER_ROLE';

    if (!idMatch || !authPermit) {
      return res.status(403).json({ msg: 'You do not have permission' });
    }

    if (!oldPass || !newPass) {
      return res.status(400).json({ msg: 'Provide old and new password' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    //Check current password
    const passValid = bcryptjs.compareSync(oldPass, user.password);
    if (!passValid) return res.status(400).json({ msg: 'Invalid password' });

    if (username) user.username = username;

    if (email) user.email = email;
    //Hash the new password
    const passHash = bcryptjs.hashSync(newPass, 10);
    user.password = passHash;

    await user.save();

    res.status(200).json({ msg: 'Profile updated', user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Unexpected Error' });
  }
};
