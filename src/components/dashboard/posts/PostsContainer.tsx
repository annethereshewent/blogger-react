import { Post } from '../../../types/post/Post'
import { PostCard } from './PostCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularProgress } from '@mui/material'
import twemoji from 'twemoji'
import { useEffect } from 'react'
import { User } from '../../../types/user/User'

interface PostsContainerProps {
  user?: User
  posts: Post[]
  setPosts: (posts: Post[]) => void
  fetchPosts: (setHasMore: (hasMore: boolean) => void) => void
  hasMore: boolean
  setHasMore: (hasMore: boolean) => void
}

export function PostsContainer({
  posts,
  fetchPosts,
  hasMore,
  setHasMore,
  user,
  setPosts
}: PostsContainerProps) {
  useEffect(() => {
    twemoji.parse(
      document.body,
      { folder: 'svg', ext: '.svg' } // This is to specify to Twemoji to use SVGs and not PNGs
    )
  }, [posts])

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
          <PostCard key={post.id} post={post} posts={posts} setPosts={setPosts} user={user} />
        ))}
      </InfiniteScroll>
    </div>
  )
}
