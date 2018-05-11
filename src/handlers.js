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
    const {skip, limit} = request.query;
    return r.table(env.DB_TABLE_NAME).skip(skip).limit(limit)
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
  static likePost(request) {
    const { postId } = request.params;
    const { payload: { userId } } = request;

    return r.table(env.DB_TABLE_NAME)
      .get(postId)
      .update({
          likedBy: r.row('likedBy').append(userId),
          likeCount: r.row('likeCount').add(1)
      }, {returnChanges: true})
  }

  @ReplyPromiseResponse
  static unlikePost(request) {
    const { postId } = request.params;
    const { payload: { userId } } = request;
    
    return r.table(env.DB_TABLE_NAME)
    .get(postId).update(function (row)  {
      return {
        'likedBy': row('likedBy')
          .filter(function (item) { return item.ne(userId) }),
        'likeCount': row('likeCount').sub(1)
      }
    }, {returnChanges: true})
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
