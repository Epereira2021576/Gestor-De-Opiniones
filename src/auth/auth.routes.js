import { Router } from 'express';
import { check } from 'express-validator';
import { login, register } from '../auth/auth.controller.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { emailExists } from '../helpers/db-validators.js';

const router = Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be more than 6 characters').isLength({
      min: 6,
    }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    validateFields,
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
);
export default router;
