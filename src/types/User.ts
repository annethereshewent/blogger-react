

export interface User {
  email: string,
  username: string,
  description: string,
  avatars: UserAvatars,
  gender: string,
  confirmed_at: string
}

interface UserAvatars {
  thumb: string,
  small: string,
  medium: string,
  large: string
}