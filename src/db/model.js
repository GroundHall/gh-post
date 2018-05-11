/**
 * This file handles the model/models for
 * the perticular microservice
 */

import Joi from 'joi';

export const PostModel = Joi.object({
  userId: Joi.string(),
  hashtagId: Joi.string(),
  text: Joi.string(),
  imageURL: Joi.string(),
  isPublic: Joi.bool().default(false),
  likeCount: Joi.number().default(0),
  likedBy: Joi.array().items(Joi.string()).default([])
}).required();

export const PostModelRequired = Joi.object({
  userId: Joi.string().required(),
  hashtagId: Joi.string(),
  text: Joi.string().required(),
  imageURL: Joi.string(),
  isPublic: Joi.bool().default(false),
  likeCount: Joi.number().default(0),
  likedBy: Joi.array().items(Joi.string()).default([])
}).required();

export const LikeUnlikeModel = Joi.object({
  userId: Joi.string().required()
}).required();

