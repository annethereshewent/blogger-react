import { AuthService } from '../services/AuthService'

export async function checkRefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken')

  if (refreshToken != null) {
    const interval = setInterval(async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken')

        if (refreshToken != null) {
          const result = await new AuthService().refreshToken(refreshToken)
          const { data } = result

          localStorage.setItem('apiToken', data.access_token)
          localStorage.setItem('refreshToken', data.refresh_token)
        }
      } catch (e) {
        console.log(e)
        clearInterval(interval)
        localStorage.removeItem('refreshToken')
      }
    }, 60 * 60 * 1000)
  }
}
