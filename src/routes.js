import Handlers from './handlers';

import {
  PostModel,
  PostModelRequired
} from './db/model';

const routes = [
  {
    method: 'GET',
    path: '/posts',
    handler: Handlers.getAllPosts
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
    method: 'DELETE',
    path: '/posts/{postId}',
    handler: Handlers.deletePost
  }
];

export default routes;
