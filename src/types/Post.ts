import { User } from "./User"

export interface Post {
  id: number
  body: string
  user: User
  images: PostImage[]
  created_at: string
  updated_at: string
  gif: string
}

interface PostImage {
  preview: string
}