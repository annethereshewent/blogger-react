import { PostRequest } from '../types/post/PostRequest'
import { BaseService } from './BaseService'

export class DashboardService extends BaseService {
  async getUserData() {
    return await this.client.get('/api/v1/users/user')
  }

  async hideAvatarDialog() {
    return await this.client.post('/api/v1/users/hide_avatar_dialog')
  }

  async submitPost(postRequest: PostRequest) {
    return await this.client.post('/api/v1/users/posts', postRequest)
  }

  async fetchPosts(page = 1) {
    return await this.client.get(`/api/v1/users/posts?page=${page}`)
  }

  async fetchPostsByTag(tag: string, page: number) {
    return await this.client.get(`/api/v1/users/tags/${tag}?page=${page}`)
  }

  async uploadImages(postId: number, formData: FormData) {
    return await this.client.post(`/api/v1/users/posts/${postId}/images`, formData)
  }

  async likePost(postId: number) {
    return await this.client.post(`/api/v1/users/posts/${postId}/likes`)
  }
}
