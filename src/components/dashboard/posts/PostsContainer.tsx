import { Post } from '../../../types/Post'
import { PostCard } from './PostCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularProgress } from '@mui/material'

interface PostsContainerProps {
  posts: Post[]
  fetchPosts: () => void
}

export function PostsContainer({ posts, fetchPosts }: PostsContainerProps) {
  return (
    <div id="posts-container" style={{ overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={true}
        scrollableTarget="scrollable-target"
        loader={<CircularProgress />}
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
