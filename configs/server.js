'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import postCommentsRoutes from '../src/posts/post.routes.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/commentsAPI/v1/users';
    this.authPath = '/commentsAPI/v1/auth';
    this.postsPath = '/commentsAPI/v1/posts';
    this.middlewares();
    this.connectDB();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(this.userPath, userRoutes);
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.postsPath, postCommentsRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port ', this.port);
    });
  }
}

export default Server;
