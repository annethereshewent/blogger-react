import { BaseService } from './BaseService'

export class PostService extends BaseService {
  async getPost(postId: number) {
    return await this.client.get(`/api/v1/users/posts/${postId}`)
  }

  async getReplies(replyableId: number, replyableType: string, page: number) {
    return await this.client.get(`/api/v1/users/replies/${replyableId}?page=${page}`)
  }
}
