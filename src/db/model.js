/**
 * This file handles the model/models for
 * the perticular microservice
 */

import Joi from 'joi';

export const PostModel = Joi.object({
  user_id: Joi.string(),
  hashtag_id: Joi.string(),
  text: Joi.string(),
  image_uri: Joi.string(),
}).required();

export const PostModelRequired = Joi.object({
  user_id: Joi.string().required(),
  hashtag_id: Joi.string(),
  text: Joi.string().required(),
  image_uri: Joi.string(),
}).required();
