import { AxiosInstance } from "axios"
import { BaseService } from "./BaseService"

export class DashboardService extends BaseService {
  constructor() {
    super()
  }

  async getDashboardData() {
    return await this.client.get('/api/v1/users/dashboard')
  }

  async hideAvatarDialog() {
    return await this.client.post('/api/v1/users/hide_avatar_dialog')
  }

  async submitPost(body: string) {
    return await this.client.post('/api/v1/users/posts', { body })
  }

  async fetchPosts() {
    return await this.client.get('/api/v1/users/posts')
  }
}