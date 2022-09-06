import { apiClient } from "./util/apiClient"


export class AuthService {
  static async login(username: string, password: string) {
    return await apiClient.post(`/oauth/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`, {
      username,
      password,
      grant_type: 'password'
  })
  }

  static async reigster() {
    return await apiClient.post(`/api/v1/auth/register`)
  }
}