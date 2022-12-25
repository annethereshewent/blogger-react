import { Avatar, Button } from '@mui/material'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Gif } from '../../../types/post/Gif'
import { Post } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { updatePostField } from '../../../util/updatePostField'
import { PostAddons } from './PostAddons'

interface ReplyFieldProps {
  user: User
  post: Post
}

export function ReplyField({ user, post }: ReplyFieldProps) {
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
              post={body}
              setPost={setBody}
              range={range}
              emojiNumber={emojiNumber}
              setEmojiNumber={setEmojiNumber}
              setRange={setRange}
            />
            <div style={{ width: '100%' }}>
              <Button variant="contained" color="success" className="reply-button">
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
