import { Avatar, Button, CircularProgress, InputProps, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { DashboardService } from '../../../services/DashboardService'
import { Post } from '../../../types/Post'
import { PostAddons } from './PostAddons'
import { GifElement } from './GifElement'
import { PostRequest } from '../../../types/PostRequest'
import { Gif } from '../../../types/Gif'
import { tagRegex } from '../../../util/tagRegex'
import twemoji from 'twemoji'
import { moveCaretAtEmoji, moveCaretToEnd } from '../../../util/moveCaret'

interface PostFieldProps {
  avatar: string | undefined
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export function PostField({ avatar, posts, setPosts }: PostFieldProps) {
  const [post, setPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputStyles, setInputStyles] = useState({})
  const [gif, setGif] = useState<Gif>({
    src: '',
    original_src: ''
  })
  const [emojiNumber, setEmojiNumber] = useState(1)
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [range, setRange] = useState<Range>()

  const editableDiv = useRef<HTMLDivElement>(null)

  function handlePostChange(e: React.ChangeEvent<HTMLDivElement>) {
    const emojiRegex = /\p{Extended_Pictographic}/u
    if (emojiRegex.test(e.currentTarget.innerText)) {
      if (editableDiv.current != null) {
        twemoji.parse(document.body, {
          folder: 'svg',
          ext: '.svg',
          className: `emoji emoji-${emojiNumber}`
        })
        moveCaretAtEmoji(editableDiv.current, `emoji-${emojiNumber}`)
        setEmojiNumber(emojiNumber + 1)
      }
    }
    setPost(e.currentTarget.innerHTML || '')
  }

  // returns unique tags only
  function parseTags(): string[] | undefined {
    return post
      .match(tagRegex)
      ?.map((tag) => tag.replace('#', ''))
      ?.filter((value, index, self) => self.indexOf(value) === index)
  }

  async function submitPost() {
    const dashboardService = new DashboardService()
    try {
      setLoading(true)

      const postRequest: PostRequest = {
        body: post
      }

      if (gif.src !== '') {
        postRequest.gif = gif.src
        postRequest.original_gif_url = gif.original_src
      }

      // parse any tags that might be in the post
      const tags = parseTags()

      if (tags != null) {
        postRequest.tags = tags
      }

      if (files.length) {
        // this lets the backend know that it's ok to have an empty post body
        postRequest.images = true
      }

      const result = await dashboardService.submitPost(postRequest)

      const { data } = result

      let newPost = data.post
      // finally handle images
      if (files.length) {
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
          formData.append('files[]', files[i])
        }

        const result = await dashboardService.uploadImages(newPost.id, formData)
        const { data } = result

        newPost = data.post
      }

      setPosts([newPost, ...posts])
    } catch (e) {
      // @ TODO: add error handling
    } finally {
      setPost('')
      setGif({
        src: '',
        original_src: ''
      })
      setImages([])
      setFiles([])
      setEmojiNumber(1)
      if (editableDiv.current != null) {
        editableDiv.current.innerHTML = ''
      }

      setLoading(false)
    }
  }

  function handleFocus() {
    setInputStyles({
      borderBottom: '1px solid #2418cd'
    })
  }

  function handleBlur() {
    setInputStyles({
      borderBottom: 'none'
    })

    let selection = window.getSelection()
    let range = selection?.getRangeAt(0)

    if (range != null) {
      setRange(range)
    }
  }

  return (
    <div id="post-field">
      <div className="input-area">
        <Avatar src={avatar} className="post-avatar" />
        {/* <TextField
          onFocus={handleFocus}
          onBlur={handleBlur}
          InputProps={inputProps}
          className="post-text-field"
          multiline
          fullWidth
          value={post}
          minRows={4}
          maxRows={25}
          variant="standard"
          placeholder="What's on your mind?"
          onChange={handlePostChange}
        /> */}
        <div
          className="post-input"
          style={inputStyles}
          ref={editableDiv}
          contentEditable={true}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handlePostChange}
          placeholder="What's on your mind?"
        />
      </div>
      <div className="images" />
      {gif.src !== '' && <GifElement src={gif.src} originalSrc={gif.original_src} />}
      <div className="images-row">
        {images.map((image) => (
          <img alt="alt text" key={image} src={image} style={{ width: '45%' }} />
        ))}
      </div>
      <div className="post-buttons-wrapper">
        <PostAddons
          setGif={setGif}
          setImages={setImages}
          images={images}
          files={files}
          setFiles={setFiles}
          editableDivRef={editableDiv.current}
          post={post}
          setPost={setPost}
          range={range}
          emojiNumber={emojiNumber}
          setEmojiNumber={setEmojiNumber}
        />
        <div className="post-buttons">
          {/* prettier-ignore */}
          <Button
            className="submit-button"
            onClick={submitPost}
            variant="contained"
            color="success"
            disabled={post === '' && gif.src === '' && images.length < 1}
          >
            Post
          </Button>
          <div style={{ clear: 'both' }} />
        </div>
        {loading && <CircularProgress color="success" />}
      </div>
    </div>
  )
}
