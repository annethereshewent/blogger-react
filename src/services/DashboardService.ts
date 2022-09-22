import { AxiosInstance } from "axios"
import { PostRequest } from "../types/PostRequest"
import { BaseService } from "./BaseService"

export class DashboardService extends BaseService {
  constructor() {
    super()
  }

  async getUserData() {
    return await this.client.get('/api/v1/users/user')
  }

  async hideAvatarDialog() {
    return await this.client.post('/api/v1/users/hide_avatar_dialog')
  }

  async submitPost(postRequest: PostRequest) {
    return await this.client.post('/api/v1/users/posts', postRequest)
  }

  async fetchPosts() {
    return await this.client.get('/api/v1/users/posts')
  }
}