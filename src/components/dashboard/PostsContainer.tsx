import { Post } from "../../types/Post"
import { User } from "../../types/User"
import { PostCard } from "./PostCard"

interface PostsContainerProps {
  posts: Post[]
}

export function PostsContainer({ posts }: PostsContainerProps) {

  return (
    <div id="posts-container">
      { posts.map(post => {
        return (
          <PostCard
            key={post.id}
            post={post}
          />
        )
      })}
    </div>
  )
}