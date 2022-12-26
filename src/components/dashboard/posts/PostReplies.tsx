import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { ReplyService } from '../../../services/ReplyService'
import { Post } from '../../../types/post/Post'
import { Reply } from '../../../types/post/Reply'
import { User } from '../../../types/user/User'
import { DashboardContainer } from '../DashboardContainer'
import { PostCard } from './PostCard'
import '../../../styles/dashboard.scss'
import { ReplyCard } from './ReplyCard'
import { ReplyField } from './ReplyField'
import { Image } from '../../../types/post/Image'
import { ImageModal } from './ImageModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularProgress } from '@mui/material'
import { PostService } from '../../../services/PostService'

export function PostReplies() {
  const { postId } = useParams()

  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<Post>()
  const [replies, setReplies] = useState<Reply[]>([])
  const [image, setImage] = useState<Image | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useUser(setLoading, setUser, null, false)

  useEffect(() => {
    getPost()
    getPostReplies()
  }, [postId])

  async function getPost() {
    if (postId != null) {
      setLoading(true)
      try {
        const result = await new PostService().getPost(parseInt(postId))

        const { data } = result

        setPost(data.post)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  }

  async function getPostReplies() {
    if (postId != null) {
      setLoading(true)
      try {
        const result = await new ReplyService().getReplies(parseInt(postId), 'Post', page)

        const { data } = result

        if (data.replies.length) {
          const concatedReplies = replies.concat(data.replies)

          setReplies(concatedReplies)
          setPage(page + 1)
        } else {
          setHasMore(false)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  }

  function setOpenPostModal() {}

  return (
    <div id="post-replies">
      {post && (
        <DashboardContainer user={user} title="Thread" setOpenPostModal={setOpenPostModal}>
          <div>
            <PostCard post={post} setPost={setPost} setImage={setImage} />
            {user && (
              <ReplyField user={user} post={post} replies={replies} setReplies={setReplies} />
            )}
          </div>
          {replies.length > 0 && (
            <InfiniteScroll
              dataLength={replies.length}
              next={getPostReplies}
              hasMore={hasMore}
              scrollableTarget="scrollable-target"
              loader={
                <div style={{ textAlign: 'center' }}>
                  <CircularProgress />
                </div>
              }
            >
              {replies.map((reply) => (
                <ReplyCard
                  key={reply.id}
                  reply={reply}
                  replies={replies}
                  user={user}
                  setReplies={setReplies}
                  setImage={setImage}
                />
              ))}
            </InfiniteScroll>
          )}
        </DashboardContainer>
      )}
      <ImageModal image={image} setImage={setImage} />
    </div>
  )
}
