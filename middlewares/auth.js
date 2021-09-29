const { JWT_SECRET } = process.env;

import jwt from 'jsonwebtoken';
import models from '../models';
import { AuthenticationError } from '../utils/errors';

export default async (req, _, next) => {
  const token = (req.headers.authorization || '').split(' ')[1];
  if (!token) throw new AuthenticationError('Authentication error, missing token.');

  let userPayload = null;

  try {
    userPayload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new AuthenticationError('Authentication error, token malformed or expired.');
  }

  const user = await models.User.findOne({ id: userPayload.id });
  if (!user) throw new AuthenticationError('Authentication error, incorrect user.');
  if (user.disabled) throw new AuthenticationError('Authentication error, disabled user.');

  req.currentUser = user;

  return next();
};
