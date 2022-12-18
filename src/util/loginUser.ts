import { AuthService } from '../services/AuthService'
import { checkRefreshToken } from './checkRefreshToken'

export async function loginUser(email: string, password: string) {
  try {
    const authService = new AuthService()
    const result = await authService.login(email, password)

    const { data } = result

    const token = data.access_token

    if (data.refresh_token != null) {
      localStorage.setItem('refreshToken', data.refresh_token)
      checkRefreshToken()
    }

    if (token != null) {
      localStorage.setItem('apiToken', token)
      // redirect to dashboard
      return true
    }

    return false
  } catch (e) {
    return false
  }
}
