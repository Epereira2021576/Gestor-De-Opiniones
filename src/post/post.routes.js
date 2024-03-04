import { Router } from 'express';
import { check } from 'express-validator';
import { validateJWT } from '../middlewares/validate-jwt.js';

import { validateFields } from '../middlewares/validate-fields.js';

import { createPost, updatePost, addComment } from './post.controller.js';

const router = Router();

router.post('/', [validateJWT, validateFields, createPost]);

router.post(
  '/commentPost/:userId',
  [
    validateJWT,
    check('postId', 'Post ID is required').notEmpty(),
    validateFields,
  ],
  addComment
);

router.put('/:createdAt', [validateJWT, validateFields, updatePost]);

export default router;
