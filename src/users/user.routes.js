import { Router } from 'express';
import { check } from 'express-validator';
import { userPost, userGet, userLogin } from './user.controller.js';
import { emailExists, userExistsById } from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = new Router();

router.get('/', userGet);

router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('email').custom(emailExists),
    check('password', 'Password is required').isLength({ min: 6 }),
    validateFields,
  ],
  userPost
);

//Login route
router.post(
  '/login',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  userLogin
);

export default router;
