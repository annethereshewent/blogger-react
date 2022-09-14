import { AuthService } from "../services/AuthService"

export async function loginUser(email: string, password: string) {
  const result = await new AuthService().login(email, password)

  const { data } = result

  const token = data.access_token

  if (token != null) {
    localStorage.setItem('apiToken', token)
    // redirect to dashboard
    return true
  }

  return false
}