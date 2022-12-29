import { Post } from '../../../types/post/Post'

interface PostWithReplyProps {
  post: Post
  reply: Post
  replies: Post[]
}

export function PostWithReply({ post, reply, replies }: PostWithReplyProps) {
  return <div>Hello world</div>
}
