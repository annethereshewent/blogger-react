import { User } from '../user/User'
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
}
