import Joi from 'joi';
import Handlers from './handlers';

import {
  PostModel,
  PostModelRequired,
  LikeUnlikeModel
} from './db/model';

const routes = [
  {
    method: 'GET',
    path: '/posts',
    handler: Handlers.getAllPosts,
    config: {
      validate: {
        query: {
          limit: Joi.number().integer().min(1).max(100)
            .default(10),
          skip: Joi.number().integer().min(0).default(0)
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/posts/{postId}',
    handler: Handlers.getPost
  },
  {
    method: 'POST',
    path: '/posts',
    handler: Handlers.createPost,
    config: {
      validate: {
        payload: PostModelRequired
      }
    }
  },
  {
    method: 'PUT',
    path: '/posts/{postId}',
    handler: Handlers.putPost,
    config: {
      validate: {
        payload: PostModelRequired
      }
    }
  },
  {
    method: 'PATCH',
    path: '/posts/{postId}',
    handler: Handlers.patchPost,
    config: {
      validate: {
        payload: PostModel
      }
    }
  },
  {
    method: 'PATCH',
    path: '/posts/{postId}/like',
    handler: Handlers.likePost,
    config: {
      validate: {
        payload: LikeUnlikeModel
      }
    }
  },
  {
    method: 'PATCH',
    path: '/posts/{postId}/unlike',
    handler: Handlers.unlikePost,
    config: {
      validate: {
        payload: LikeUnlikeModel
      }
    }
  },
  {
    method: 'DELETE',
    path: '/posts/{postId}',
    handler: Handlers.deletePost
  }
];

export default routes;
