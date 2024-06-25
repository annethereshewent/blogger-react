import { useEffect, useState } from 'react'
import { Post, PublishedPost } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { DashboardContainer } from '../DashboardContainer'
import { PostCard } from '../posts/PostCard'
import '../../../styles/dashboard.scss'
import { ReplyCard } from './ReplyCard'
import { ReplyField } from './ReplyField'
import { Image } from '../../../types/post/Image'
import { ImageModal } from '../posts/ImageModal'
import InfiniteScroll from 'react-infinite-scroll-component'
import { CircularProgress, Snackbar } from '@mui/material'
import { PostModal } from '../posts/PostModal'
import { ReplyModal } from './ReplyModal'

interface PostRepliesParams {
  post: Post
  parent?: Post
  replies: Post[]
  user?: User
  setPost: (post: Post) => void
  setParent: (post: Post) => void
  setReplies: (replies: Post[]) => void
  hasMore: boolean
  getPostReplies: () => void
}

export function PostReplies({
  post,
  parent,
  replies,
  user,
  setPost,
  setReplies,
  setParent,
  hasMore,
  getPostReplies
}: PostRepliesParams) {
  const [image, setImage] = useState<Image | null>(null)
  const [openPostModal, setOpenPostModal] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [replyable, setReplyable] = useState<PublishedPost>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!post.deleted) {
      setReplyable(post)
    }
  }, [post])

  return (
    <div id="post-replies">
      {post && (
        <DashboardContainer user={user} title="Thread" setOpenPostModal={setOpenPostModal}>
          <div>
            {parent != null && !parent.deleted && (
              <PostCard
                post={parent}
                setPost={setParent}
                setImage={setImage}
                user={user}
                replyable={replyable}
                setReplyable={setReplyable}
              />
            )}
            {(parent?.deleted || post.deleted) && (
              <div className="deleted-post">This post has been deleted by the original poster</div>
            )}
            {!post.deleted && (
              <PostCard
                post={post}
                replyable={replyable}
                setPost={setPost}
                setImage={setImage}
                user={user}
                setReplyable={setReplyable}
              />
            )}
            {user && !post.deleted && (
              <ReplyField
                user={user}
                replyable={post}
                replies={replies}
                setReplies={setReplies}
                post={post}
                setPost={setPost}
              />
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
                <div key={reply.deleted ? -1 : reply.id}>
                  {reply.deleted && (
                    <div className="deleted-post">
                      This post has been deleted by the original poster
                    </div>
                  )}
                  {!reply.deleted && (
                    <ReplyCard
                      reply={reply}
                      replyable={replyable}
                      replies={replies}
                      user={user}
                      setReplies={setReplies}
                      setImage={setImage}
                      setReplyable={setReplyable}
                      setOpen={setOpen}
                    />
                  )}
                </div>
              ))}
            </InfiniteScroll>
          )}
        </DashboardContainer>
      )}
      <ImageModal image={image} setImage={setImage} />
      <PostModal
        open={openPostModal}
        avatar={user?.avatars?.small}
        setOpen={setOpenPostModal}
        setShowSnackbar={setShowSnackbar}
      />
      {user && replyable && (
        <ReplyModal
          user={user}
          replyable={replyable}
          setReplyable={setReplyable}
          posts={replies}
          setPosts={setReplies}
          setPost={setPost}
          open={open}
          setOpen={setOpen}
        />
      )}
      <Snackbar
        open={showSnackbar}
        color="success"
        autoHideDuration={1000}
        onClose={() => setShowSnackbar(false)}
        message="Post sent!"
      />
    </div>
  )
}
