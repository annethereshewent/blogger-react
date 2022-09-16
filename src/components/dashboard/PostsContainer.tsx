import { Post } from "../../types/Post"
import { PostCard } from "./PostCard"

interface PostsContainerProps {
  posts: Post[]
}

export function PostsContainer({ posts }: PostsContainerProps) {

  return (
    <div id="posts-container">
      { posts.map(post => {
        return (
          <PostCard key={post.id} post={post} />
        )
      })}
    </div>
  )
}