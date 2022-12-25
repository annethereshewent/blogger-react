import { Image } from './Image'
import { User } from '../user/User'

export interface Post {
  id: number
  body: string
  user: User
  images: Image[]
  tags?: string[]
  created_at: string
  updated_at: string
  gif: string
  original_gif_url: string
  like_count: number
  reply_count: number
  likes: Like[]
}

interface Like {
  username: string
}
