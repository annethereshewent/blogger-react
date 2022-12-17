export interface PostRequest {
  body: string
  gif?: string
  original_gif_url?: string
  images?: File[]
  tags?: string[]
}
