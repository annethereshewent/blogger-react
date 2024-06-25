import { Avatar } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Image } from '../../../types/post/Image'
import { Post, PublishedPost } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { convertPost } from '../../../util/convertPost'
import { GifElement } from '../posts/GifElement'
import { ReplyCardActions } from './ReplyCardActions'
import { PostCardMenu } from '../posts/PostCardMenu'

interface ReplyCardProps {
  reply: PublishedPost
  replyable?: PublishedPost
  user?: User
  replies?: Post[]
  setReplies?: (replies: Post[]) => void
  setReplyable: (replyable: PublishedPost) => void
  setImage: (image: Image | null) => void
  setOpen: (open: boolean) => void
}

export function ReplyCard({
  reply,
  replyable,
  user,
  replies,
  setReplies,
  setImage,
  setReplyable,
  setOpen
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
        <PostCardMenu
          user={user}
          post={reply}
          replyable={replyable}
          posts={replies}
          setPosts={setReplies}
          setReplyable={setReplyable}
        />
      </div>
      <ReplyCardActions
        reply={reply}
        setReplies={setReplies}
        user={user}
        replies={replies}
        setReplyable={setReplyable}
        setOpen={setOpen}
      />
    </div>
  )
}
