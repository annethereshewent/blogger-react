import { BaseService } from './BaseService'

export class ReplyService extends BaseService {
  async createReply(replyableId: number, replyableType: string, body: string) {
    return await this.client.post('/api/v1/users/replies', {
      replyable_id: replyableId,
      replyable_type: replyableType,
      body
    })
  }

  async likeReply(id: number) {
    return await this.client.post(`/api/v1/users/replies/${id}/likes`)
  }

  async getReplies(postId: number, replyableType: string, page: number) {
    return await this.client.get(
      `/api/v1/users/replies/${postId}?replyable_type=${replyableType}&page=${page}`
    )
  }
}
