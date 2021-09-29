import Joi from 'joi';
import models from '../../models';
import { NotFoundError, ValidationError } from '../../utils/errors';

const all = async (req, res) => {
  const posts = await models.Post.findAll();
  return res.json(posts);
};

const create = async (req, res) => {
  const validations = Joi.object({
    title: Joi.string().trim().required().min(5),
    body: Joi.string().trim().required().min(40),
  }).validate(req.body, { allowUnknown: true });

  if (validations.error) throw new ValidationError(validations.error.details[0].message);

  const post = await models.Post.create({
    userId: req.currentUser.id,
    title: validations.value.title,
    body: validations.value.body,
  });
  return res.json(post);
};

const detail = async (req, res) => {
  const post = await models.Post.findOne({ id: req.params.id });
  if (!post) throw new NotFoundError(`Unable to find wishlist with id ${req.params.id}`);

  return res.json(post);
};

const update = async (req, res) => {
  const post = await models.Post.findOne({ id: req.params.id });
  if (!post) throw new NotFoundError(`Unable to find wishlist with id ${req.params.id}`);

  const validations = Joi.object({
    title: Joi.string().trim().required().min(5),
    body: Joi.string().trim().required().min(40),
  }).validate(req.body, { allowUnknown: true });

  if (validations.error) throw new ValidationError(validations.error.details[0].message);

  await post.update({
    userId: req.currentUser.id,
    title: validations.value.title,
    body: validations.value.body,
  });

  return res.json(post);
};

const destroy = async (req, res) => {
  const post = await models.Post.findOne({ id: req.params.id });
  if (!post) throw new NotFoundError(`Unable to find wishlist with id ${req.params.id}`);

  await post.destroy();

  return res.json(post);
};

export default {
  all,
  create,
  detail,
  update,
  destroy,
};
