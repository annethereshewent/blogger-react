import { BaseService } from './BaseService'

export class UserService extends BaseService {
  async updateAvatar(avatar: string) {
    return this.client.post('/api/v1/users/update_avatar', { avatar })
  }

  async userExists(username: string) {
    return this.client.post('/api/v1/users/user_exists', { username })
  }

  async emailExists(email: string) {
    return this.client.post('/api/v1/users/email_exists', { email })
  }

  async getProfilePosts(username: string, page: number) {
    return await this.client.get(`/api/v1/users/profile/${username}?page=${page}`)
  }

  async getUserData(username: string) {
    return await this.client.get(`/api/v1/users/user/${username}`)
  }
  async saveDetails(description: string, gender: string, displayName: string) {
    return await this.client.post('/api/v1/users/profile', {
      description,
      gender,
      display_name: displayName
    })
  }

  async updateBanner(bannerUrl: string) {
    return await this.client.post('api/v1/users/profile/banner', { banner_url: bannerUrl })
  }

  async followUser(username: string) {
    return await this.client.post(`/api/v1/users/user/${username}/follow`)
  }

  async unfollowUser(username: string) {
    return await this.client.delete(`/api/v1/users/user/${username}/follow`)
  }
}
