import { BaseService } from './BaseService'

export class ReplyService extends BaseService {
  async getPostReplies(postId: number) {
    return await this.client.get(`/api/v1/users/posts/${postId}`)
  }
}
