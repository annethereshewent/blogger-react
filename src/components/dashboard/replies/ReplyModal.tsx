import { Avatar, Card, CardContent, Modal } from '@mui/material'
import moment from 'moment'
import { Post, PublishedPost } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { convertPost } from '../../../util/convertPost'
import { modalStyleLarge } from '../../../util/modalStyles'
import { CloseButton } from '../../shared/CloseButton'
import { ReplyField } from './ReplyField'

/**
 * note that posts can be either posts or replies
 * the only difference between the two is a flag
 * set on the backend that tells the difference
 */
interface ReplyModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  replyable: PublishedPost
  posts: Post[]
  setReplyable: (replyable: PublishedPost) => void
  setPosts: (replyables: Post[]) => void
  user: User
  // setPost and post are only set in the PostReplies component, for updating the reply count
  setPost?: (post: Post) => void
  post?: PublishedPost
}

export function ReplyModal({
  user,
  setReplyable,
  setPosts,
  posts,
  replyable,
  open,
  setOpen,
  post,
  setPost
}: ReplyModalProps) {
  function onClose() {
    setOpen(false)
  }
  return (
    <Modal id="reply-modal" open={open}>
      <Card style={{ ...modalStyleLarge, borderRadius: '15px' }}>
        <CloseButton handleClose={onClose} />
        {replyable && (
          <CardContent>
            <div className="replied-post">
              <div className="replied-wrapper">
                <Avatar src={replyable.user.avatars.small} className="replied-avatar" />
                <div className="replied-post-contents">
                  <strong>{replyable.user.display_name}</strong>
                  <span className="replied-username">@{replyable.user.username}</span>
                  <span className="replied-date">{moment(replyable.created_at).fromNow()}</span>
                  <p
                    className="replied-body"
                    dangerouslySetInnerHTML={{ __html: convertPost(replyable) }}
                  />
                </div>
              </div>
            </div>
            <div className="reply">
              <ReplyField
                user={user}
                replyable={replyable}
                style={{ borderBottom: 'none' }}
                setReplyable={setReplyable}
                replies={posts}
                setReplies={setPosts}
                setOpen={setOpen}
                post={post}
                setPost={setPost}
              />
            </div>
          </CardContent>
        )}
      </Card>
    </Modal>
  )
}
