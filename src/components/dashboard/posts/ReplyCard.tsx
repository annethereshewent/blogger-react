import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { ReplyService } from '../../../services/ReplyService'
import { Image } from '../../../types/post/Image'
import { Reply } from '../../../types/post/Reply'
import { User } from '../../../types/user/User'
import { convertPost } from '../../../util/convertPost'
import { GifElement } from './GifElement'

interface ReplyCardProps {
  reply: Reply
  user?: User
  replies?: Reply[]
  setReplies?: (replies: Reply[]) => void
  setImage: (image: Image | null) => void
}

export function ReplyCard({ reply, user, replies, setReplies, setImage }: ReplyCardProps) {
  const navigate = useNavigate()

  async function likeReply() {
    try {
      const result = await new ReplyService().likeReply(reply.id)

      const { data } = result

      if (setReplies != null && replies != null) {
        const repliesCopy = [...replies]

        const i = repliesCopy.indexOf(reply)

        repliesCopy.splice(i, 1, result.data.reply)

        setReplies(repliesCopy)
      }
    } catch (e) {
      console.log(e)
    }
  }

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
    </div>
  )
}
