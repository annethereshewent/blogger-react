import { Post } from '../../../types/Post'
import { PostCard } from './PostCard'

interface PostsContainerProps {
  posts: Post[]
  fetchPosts: () => void
}

export function PostsContainer({ posts, fetchPosts }: PostsContainerProps) {
  return (
    <div id="posts-container">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
