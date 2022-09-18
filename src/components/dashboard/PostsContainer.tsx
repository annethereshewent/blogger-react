import { Post } from "../../types/Post"
import { User } from "../../types/User"
import { PostCard } from "./PostCard"

interface PostsContainerProps {
  posts: Post[]
  user: User
}

export function PostsContainer({ posts, user }: PostsContainerProps) {

  return (
    <div id="posts-container">
      { posts.map(post => {
        return (
          <PostCard
            key={post.id}
            post={post}
            user={user}
          />
        )
      })}
    </div>
  )
}