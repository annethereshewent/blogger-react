import { BaseService } from './BaseService'


export class UserService extends BaseService {
  constructor() {
    super()
  }

  async updateAvatar(avatar: string) {
    return this.client.post('/api/v1/users/update_avatar', { avatar })
  }

  async userExists(username: string) {
    return this.client.post('/api/v1/users/user_exists', { username })
  }

  async emailExists(email: string) {
    return this.client.post('/api/v1/users/email_exists', { email })
  }
}