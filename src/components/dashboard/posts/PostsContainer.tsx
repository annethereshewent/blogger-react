import { Post } from '../../../types/Post'
import { PostCard } from './PostCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularProgress } from '@mui/material'

interface PostsContainerProps {
  posts: Post[]
  fetchPosts: (setHasMore: (hasMore: boolean) => void) => void
  hasMore: boolean
  setHasMore: (hasMore: boolean) => void
}

export function PostsContainer({ posts, fetchPosts, hasMore, setHasMore }: PostsContainerProps) {
  return (
    <div id="posts-container" style={{ overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => fetchPosts(setHasMore)}
        hasMore={hasMore}
        scrollableTarget="scrollable-target"
        loader={
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        }
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
