import { BaseService } from './BaseService'

export class ReplyService extends BaseService {
  async createReply(replyableId: number, replyRequest: { [key: string]: any }) {
    return await this.client.post('/api/v1/users/replies', replyRequest)
  }

  async likeReply(id: number) {
    return await this.client.post(`/api/v1/users/replies/${id}/likes`)
  }

  async getReplies(replyableId: number, replyableType: string, page: number) {
    return await this.client.get(
      `/api/v1/users/replies/${replyableId}?replyable_type=${replyableType}&page=${page}`
    )
  }

  async uploadImages(replyId: number, formData: FormData) {
    return await this.client.post(`/api/v1/users/replies/${replyId}/images`, formData)
  }
}
