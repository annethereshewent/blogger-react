import { BaseService } from './BaseService'

export class AuthService extends BaseService {
  async login(username: string, password: string) {
    return await this.client.post(
      `/oauth/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`,
      {
        username,
        password,
        grant_type: 'password'
      }
    )
  }

  async reigster(username: string, email: string, password: string, gender: string) {
    return await this.client.post(`/api/v1/auth/register`, {
      username,
      email,
      password,
      gender
    })
  }

  async refreshToken(refreshToken: string) {
    return await this.client.post('/oauth/token', {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  }
}
