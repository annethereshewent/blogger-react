import { User } from "./User"

export interface Post {
  id: number
  body: string
  user: User
  images: PostImage[]
  created_at: string
  updated_at: string
  gifs: string[]
}

interface PostImage {
  preview: string
}