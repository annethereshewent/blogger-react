import { User } from '../user/User'
import { Image } from './Image'
import { Like } from './Post'

export interface Reply {
  body: string
  id: number
  user: User
  created_at: string
  tags: string[]
  reply_count: number
  likes: Like[]
  like_count: number
  images: Image[]
  gif: string
  original_gif_url: string
}
