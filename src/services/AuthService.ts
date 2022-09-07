import { BaseService } from "./BaseService"

export class AuthService extends BaseService {
  async login(email: string, password: string) {
    return await this.client.post(`/oauth/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`, {
      email,
      password,
      grant_type: 'password'
    })
  }

  async reigster() {
    return await this.client.post(`/api/v1/auth/register`)
  }
}