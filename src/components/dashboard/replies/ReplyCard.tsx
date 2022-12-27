import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { ReplyService } from '../../../services/ReplyService'
import { Image } from '../../../types/post/Image'
import { Post } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { convertPost } from '../../../util/convertPost'
import { GifElement } from '../posts/GifElement'
import { ReplyCardActions } from './ReplyCardActions'

interface ReplyCardProps {
  reply: Post
  user?: User
  replies?: Post[]
  setReplies?: (replies: Post[]) => void
  setReplyable: (replyable: Post | null) => void
  setImage: (image: Image | null) => void
}

export function ReplyCard({
  reply,
  user,
  replies,
  setReplies,
  setImage,
  setReplyable
}: ReplyCardProps) {
  const navigate = useNavigate()

  return (
    <div id="reply-card" className="post-card">
      <div className="reply">
        <Avatar src={reply.user?.avatars?.small} />
        <div className="reply-wrapper">
          <div onClick={() => navigate(`/replies/${reply.id}`)}>
            <strong>{reply.user?.display_name}</strong>
            <span className="reply-username">@{reply.user?.username}</span>
            <span className="reply-date">{moment(reply.created_at).fromNow()}</span>
            <p className="reply-body" dangerouslySetInnerHTML={{ __html: convertPost(reply) }} />
          </div>
          <div className="gifs">
            {reply.gif && (
              <GifElement src={reply.gif} originalSrc={reply.original_gif_url} key={reply.gif} />
            )}
          </div>
          <div className="images">
            {reply.images.map((image) => (
              <img
                alt="alt text"
                key={image.preview}
                src={image.preview}
                style={{ width: '45%' }}
                onClick={() => setImage(image)}
              />
            ))}
          </div>
        </div>
      </div>
      <ReplyCardActions
        reply={reply}
        setReplies={setReplies}
        user={user}
        replies={replies}
        setReplyable={setReplyable}
      />
    </div>
  )
}