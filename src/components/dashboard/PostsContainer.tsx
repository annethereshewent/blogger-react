import { Post } from "../../types/Post";

interface PostsContainerProps {
  posts: Post[]
}

export function PostsContainer({ posts }: PostsContainerProps) {

  return (<div>
    { posts.map(post => {
      return (
        <div>
          { post.body }
        </div>
      )
    })}
  </div>)
}