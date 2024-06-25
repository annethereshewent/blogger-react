import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { DashboardService } from '../../../services/DashboardService'
import { Post, PublishedPost } from '../../../types/post/Post'
import { User } from '../../../types/user/User'

interface ReplyCardActionsProps {
  reply: PublishedPost
  user?: User
  replies?: Post[]
  setReplies?: (replies: Post[]) => void
  setReplyable: (replyable: PublishedPost) => void
  setOpen: (open: boolean) => void
}

export function ReplyCardActions({
  reply,
  replies,
  setReplies,
  user,
  setReplyable,
  setOpen
}: ReplyCardActionsProps) {
  async function likeReply() {
    if (user != null) {
      try {
        const result = await new DashboardService().likePost(reply.id)

        const { data } = result

        if (setReplies != null && replies != null) {
          const repliesCopy = [...replies]

          const i = repliesCopy.indexOf(reply)

          repliesCopy.splice(i, 1, data.post)

          setReplies(repliesCopy)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  function openReplyModal() {
    setReplyable(reply)
    setOpen(true)
  }

  return (
    <div className="reply-actions">
      <IconButton className="icon-button" onClick={openReplyModal}>
        <AddCommentRounded />
      </IconButton>
      {reply.reply_count > 0 && <span className="reply-count">{reply.reply_count}</span>}
      <span className="spacer" />
      <IconButton className="icon-button">
        <ReplyOutlined />
      </IconButton>
      <span className="spacer" />
      <IconButton onClick={likeReply}>
        <FavoriteOutlined
          className={
            reply.likes.filter((like) => like.username === user?.username).length === 1
              ? 'liked'
              : ''
          }
        />
      </IconButton>
      {reply.like_count > 0 && <span className="like-count">{reply.like_count}</span>}
    </div>
  )
}
