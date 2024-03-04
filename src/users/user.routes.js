import { Router } from 'express';
import { check } from 'express-validator';
import { userPut } from './user.controller.js';
import { userExistsById } from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = new Router();

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
  ],
  userPut
);
export default router;
