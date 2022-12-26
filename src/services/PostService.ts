import { BaseService } from './BaseService'

export class PostService extends BaseService {
  async getPost(postId: number) {
    return await this.client.get(`/api/v1/users/posts/${postId}`)
  }
}
