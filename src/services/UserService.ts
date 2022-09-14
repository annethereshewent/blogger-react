import { BaseService } from './BaseService'


export class UserService extends BaseService {
  constructor() {
    super()
  }

  async updateAvatar(avatar: string) {
    return this.client.post('/api/v1/users/update_avatar', { avatar })
  }
}