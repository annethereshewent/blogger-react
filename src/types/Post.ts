import { User } from './User'

export interface Post {
  id: number
  body: string
  user: User
  images: string[]
  tags?: string[]
  created_at: string
  updated_at: string
  gif: string
  original_gif_url: string
}
