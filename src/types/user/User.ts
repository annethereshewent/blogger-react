export interface User {
  email: string
  username: string
  display_name: string
  description: string
  avatars: UserAvatars
  gender: string
  confirmed_at: string
  avatar_dialog: boolean
  post_count: number
  banner: string
  join_date: string
}

interface UserAvatars {
  thumb: string
  small: string
  medium: string
  large: string
}
