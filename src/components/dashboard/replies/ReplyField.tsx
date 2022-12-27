import { Avatar, Button } from '@mui/material'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReplyService } from '../../../services/ReplyService'
import { Gif } from '../../../types/post/Gif'
import { Post } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { getRange } from '../../../util/moveCaret'
import { updatePostField } from '../../../util/updatePostField'
import { GifElement } from '../posts/GifElement'
import { PostAddons } from '../posts/PostAddons'
import { PostImage } from '../posts/PostImage'

interface ReplyFieldProps {
  user: User
  replyable: Post
  replies?: Post[]
  setReplies?: (replies: Post[]) => void
  style?: React.CSSProperties
  setReplyable?: (replyable: Post | null) => void
}

export function ReplyField({
  user,
  replyable,
  setReplies,
  replies,
  style,
  setReplyable
}: ReplyFieldProps) {
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
    const replyService = new ReplyService()
    setLoading(true)

    try {
      const images = files.length > 0
      const replyRequest: { [key: string]: any } = {
        replyable_id: replyable.id,
        replyable_type: replyable.is_reply ? 'Reply' : 'Post',
        body,
        images
      }

      if (gif.src !== '') {
        replyRequest.gif = gif.src
        replyRequest.original_gif_url = gif.original_src
      }

      const result = await replyService.createReply(replyable.id, replyRequest)

      const { data } = result

      let newReply = data.reply

      // finally upload any images
      if (files.length) {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append('files[]', files[i])
        }

        const result = await replyService.uploadImages(newReply.id, formData)
        const { data } = result

        newReply = data.reply
      }
      if (replies != null && setReplies != null) {
        setReplies([newReply, ...replies])
      }
    } catch (e) {
      console.log(e)
    } finally {
      if (editableDiv.current != null) {
        editableDiv.current.innerHTML = ''
      }
      setBody('')
      setImages([])
      setLoading(false)
      if (setReplyable != null) {
        setReplyable(null)
      }
    }
  }

  return (
    <div className="reply-field" style={style}>
      <h5 className="reply-title">
        Replying to{' '}
        <Link to={`/profile/${replyable.user.username}`}>@{replyable.user.username}</Link>
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
          {gif.src !== '' && <GifElement src={gif.src} originalSrc={gif.original_src} />}
          <div className="images-row">
            {images.map((image) => (
              <PostImage key={image} image={image} images={images} setImages={setImages} />
            ))}
          </div>
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
