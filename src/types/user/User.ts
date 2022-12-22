export interface User {
  email: string
  username: string
  description: string
  avatars: UserAvatars
  gender: string
  confirmed_at: string
  avatar_dialog: boolean
}

interface UserAvatars {
  thumb: string
  small: string
  medium: string
  large: string
}
