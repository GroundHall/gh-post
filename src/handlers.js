import Boom from 'boom';
import dateformat from 'dateformat';
import env from './env.config';
import r from './db/config';
import {
  ReplyPromiseResponse
} from './decorators';

class Handlers {
  @ReplyPromiseResponse
  static getAllPosts(request) {
    return r.table(env.DB_TABLE_NAME)
  }

  @ReplyPromiseResponse
  static getPost(request) {
    const { postId } = request.params;
    return r.table(env.DB_TABLE_NAME).get(postId);
  }

  @ReplyPromiseResponse
  static createPost(request) {
    const { payload } = request;
    return r.table(env.DB_TABLE_NAME).insert(
      r.expr(payload).merge({
        createdAt: r.now()
      }),
      // This tells rethinkdb that changes should be return
      {returnChanges: true}
    )
  }

  @ReplyPromiseResponse
  static putPost(request) {
    const { postId } = request.params;
    const { payload } = request;
    payload.id = postId;
    return r.table(env.DB_TABLE_NAME)
    .get(postId)
    .replace(payload, {returnChanges: true})
  }

  @ReplyPromiseResponse
  static patchPost(request) {
    const { postId } = request.params;
    const { payload } = request;
    payload.id = postId;
    return r.table(env.DB_TABLE_NAME)
    .get(postId)
    .update(payload, {returnChanges: true})
  }

  @ReplyPromiseResponse
  static deletePost(request) {
    const { postId } = request.params;
    return r.table(env.DB_TABLE_NAME)
      .get(postId)
      .delete({returnChanges: true})
  }
}

export default Handlers;
