export interface Post {
  id: number
  body: string
  avatar: string
  images: PostImage[]
  created_at: string
  updated_at: string
}

interface PostImage {
  preview: string
}