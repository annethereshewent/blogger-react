import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { DashboardService } from '../../../services/DashboardService'
import { Post } from '../../../types/post/Post'
import { User } from '../../../types/user/User'

interface PostCardActionsProps {
  post: Post
  setPosts?: (posts: Post[]) => void
  posts?: Post[]
  setPost?: (post: Post) => void
  user?: User
  setReplyable: (replyable: Post | null) => void
}

export function PostCardActions({
  post,
  setPosts,
  setPost,
  posts,
  user,
  setReplyable
}: PostCardActionsProps) {
  async function likePost() {
    try {
      const result = await new DashboardService().likePost(post.id)

      if (setPosts != null && posts != null) {
        const postsCopy = [...posts]

        const i = postsCopy.indexOf(post)

        postsCopy.splice(i, 1, result.data.post)

        setPosts(postsCopy)
      } else if (setPost != null) {
        setPost(result.data.post)
      }
    } catch (e: any) {
      console.log(e)
    }
  }

  async function openReplyModal() {
    if (user != null) {
      setReplyable(post)
    }
  }

  return (
    <div className="post-actions">
      <IconButton className="icon-button" onClick={openReplyModal}>
        <AddCommentRounded />
      </IconButton>
      {post.reply_count > 0 && <span className="reply-count">{post.reply_count}</span>}
      <span className="spacer" />
      <IconButton className="icon-button">
        <ReplyOutlined />
      </IconButton>
      <span className="spacer" />
      <IconButton onClick={likePost}>
        <FavoriteOutlined
          className={
            post.likes.filter((like) => like.username === user?.username).length === 1
              ? 'liked'
              : ''
          }
        />
      </IconButton>
      {post.like_count > 0 && <span className="like-count">{post.like_count}</span>}
    </div>
  )
}
