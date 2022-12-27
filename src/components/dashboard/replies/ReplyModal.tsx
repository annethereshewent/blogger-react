import { Avatar, Card, CardContent, Modal } from '@mui/material'
import moment from 'moment'
import { Post } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { convertPost } from '../../../util/convertPost'
import { modalStyleLarge } from '../../../util/modalStyles'
import { CloseButton } from '../../shared/CloseButton'
import { ReplyField } from './ReplyField'

interface ReplyModalProps {
  replyable: Post | null
  setReplyable: (replyable: Post | null) => void
  user: User
}

export function ReplyModal({ replyable, user, setReplyable }: ReplyModalProps) {
  function onClose() {
    setReplyable(null)
  }
  return (
    <Modal id="reply-modal" open={replyable != null}>
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
              />
            </div>
          </CardContent>
        )}
      </Card>
    </Modal>
  )
}
