import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Reply } from '../../../types/post/Reply'
import { User } from '../../../types/user/User'
import { convertPost } from '../../../util/convertPost'

interface ReplyCardProps {
  reply: Reply
  user?: User
}

export function ReplyCard({ reply, user }: ReplyCardProps) {
  const navigate = useNavigate()

  function likePost() {}

  return (
    <div id="reply-card" className="post-card">
      <div className="reply">
        <Avatar src={reply.user.avatars.small} />
        <div className="reply-wrapper">
          <div onClick={() => navigate(`/replies/${reply.id}`)}>
            <strong>{reply.user.display_name}</strong>
            <span className="reply-username">@{reply.user.username}</span>
            <span className="reply-date">{moment(reply.created_at).fromNow()}</span>
            <p className="reply-body" dangerouslySetInnerHTML={{ __html: convertPost(reply) }} />
          </div>
        </div>
      </div>
      <div className="reply-actions">
        <IconButton className="icon-button">
          <AddCommentRounded />
        </IconButton>
        {reply.reply_count > 0 && <span className="reply-count">{reply.reply_count}</span>}
        <span className="spacer" />
        <IconButton className="icon-button">
          <ReplyOutlined />
        </IconButton>
        <span className="spacer" />
        <IconButton onClick={likePost}>
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
    </div>
  )
}
