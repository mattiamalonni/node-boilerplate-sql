import express from 'express';

import { authentication, posts } from '../controllers';
import auth from '../middlewares/auth';

const router = express.Router();

// AUTHENTICATION
router.post('/register', authentication.register);
router.post('/login', authentication.login);

// POSTS
router.get('/posts', posts.all);
router.post('/posts', auth, posts.create);
router.get('/posts/:id', posts.detail);
router.put('/posts/:id', auth, posts.update);
router.delete('/posts/:id', auth, posts.destroy);

export default router;
