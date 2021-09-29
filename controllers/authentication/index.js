const { JWT_SECRET } = process.env;

import Joi from 'joi';
import jwt from 'jsonwebtoken';
import models from '../../models';
import { NotFoundError, ValidationError, ConflictError } from '../../utils/errors';

const register = async (req, res) => {
  const validations = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required().min(8),
  }).validate(req.body, { allowUnknown: true });

  if (validations.error) throw new ValidationError(validations.error.details[0].message);

  const alreadyExist = await models.User.findOne({ email: validations.value.email });
  if (alreadyExist) throw new ConflictError('User already registered.');

  const user = await models.User.create({
    firstName: validations.value.firstName,
    lastName: validations.value.lastName,
    email: validations.value.email,
    password: validations.value.password,
  });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

  res.json({ token });
};

const login = async (req, res) => {
  const validations = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  }).validate(req.body, { allowUnknown: true });

  if (validations.error) throw new ValidationError(validations.error.details[0].message);

  const user = await models.User.findOne({ email: validations.value.email });

  if (!user || !user.isPasswordValid(validations.value.password)) {
    throw new NotFoundError('Email or password incorrect');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);

  return res.json(token);
};

export default {
  register,
  login,
};
