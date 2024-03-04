import User from '../users/user.model.js';
import bcryptjs from 'bcryptjs';
import { jwtGenerate } from '../helpers/generate-jwt.js';

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = new User({ username, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(200).json({
    user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'Mail address is not registered',
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: 'User does not exist in the database',
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: 'Password does not match',
      });
    }

    // Create token
    const token = await jwtGenerate(user.id);

    res.status(200).json({
      msg: 'Logged in!',
      user,
      token,
    });
  } catch (e) {
    console.log('Unexpected Error:', e);
    res.status(500).json({
      msg: 'Something went wrong',
    });
  }
};
