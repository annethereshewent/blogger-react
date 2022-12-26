import { Avatar, Button } from '@mui/material'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReplyService } from '../../../services/ReplyService'
import { Gif } from '../../../types/post/Gif'
import { Post } from '../../../types/post/Post'
import { Reply } from '../../../types/post/Reply'
import { User } from '../../../types/user/User'
import { getRange } from '../../../util/moveCaret'
import { updatePostField } from '../../../util/updatePostField'
import { PostAddons } from './PostAddons'

interface ReplyFieldProps {
  user: User
  post: Post
  replies: Reply[]
  setReplies: (replies: Reply[]) => void
}

export function ReplyField({ user, post, setReplies, replies }: ReplyFieldProps) {
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState('')
  const [emojiNumber, setEmojiNumber] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [range, setRange] = useState<Range>()
  const [gif, setGif] = useState<Gif>({
    src: '',
    original_src: ''
  })

  const editableDiv = useRef<HTMLDivElement>(null)

  function handlePostChange(e: React.ChangeEvent<HTMLDivElement>) {
    updatePostField(e, emojiNumber, setEmojiNumber, setBody, editableDiv.current)
  }

  function handleBlur() {
    let newRange = getRange()

    if (newRange != null) {
      setRange(newRange)
    }
  }

  async function handleReplyClick() {
    setLoading(true)
    try {
      const result = await new ReplyService().createReply(post.id, 'Post', body)

      const { data } = result

      setReplies([...replies, data.reply])
    } catch (e) {
      console.log(e)
    } finally {
      if (editableDiv.current != null) {
        editableDiv.current.innerHTML = ''
      }
      setBody('')
      setLoading(false)
    }
  }

  return (
    <div className="reply-field">
      <h5 className="reply-title">
        Replying to <Link to={`/profile/${post.user.username}`}>@{post.user.username}</Link>
      </h5>
      <div className="reply-input-area">
        <Avatar src={user.avatars.small} className="reply-avatar" />
        <div style={{ width: '80%' }}>
          <div
            className="reply-input"
            ref={editableDiv}
            contentEditable={true}
            onInput={handlePostChange}
            placeholder="Post your reply"
            onBlur={handleBlur}
          />
          <div className="reply-actions">
            <PostAddons
              style={{ marginLeft: 0 }}
              setGif={setGif}
              setImages={setImages}
              images={images}
              files={files}
              setFiles={setFiles}
              editableDivRef={editableDiv.current}
              setPost={setBody}
              range={range}
              emojiNumber={emojiNumber}
              setEmojiNumber={setEmojiNumber}
              setRange={setRange}
            />
            <div style={{ width: '100%' }}>
              <Button
                variant="contained"
                color="success"
                className="reply-button"
                onClick={handleReplyClick}
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
