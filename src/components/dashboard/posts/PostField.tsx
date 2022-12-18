import { Avatar, Button, CircularProgress, InputProps, TextField } from '@mui/material'
import { useState } from 'react'
import { DashboardService } from '../../../services/DashboardService'
import { Post } from '../../../types/Post'
import { PostAddons } from './PostAddons'
import { GifElement } from './GifElement'
import { PostRequest } from '../../../types/PostRequest'
import { Gif } from '../../../types/Gif'
import { tagRegex } from '../../../util/tagRegex'

interface PostFieldProps {
  avatar: string | undefined
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export function PostField({ avatar, posts, setPosts }: PostFieldProps) {
  const [post, setPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputProps, setInputProps] = useState<Partial<InputProps>>({
    disableUnderline: true
  })
  const [gif, setGif] = useState<Gif>({
    src: '',
    original_src: ''
  })
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  function handlePostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost(e.target.value)
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
          console.log(`appending ${files[i].name}`)
          formData.append('files[]', files[i])
        }

        const result = await dashboardService.uploadImages(newPost.id, formData)
        const { data } = result

        newPost = data.post
      }

      setPosts([newPost, ...posts])
      setImages([])
      setFiles([])
    } catch (e) {
      // @ TODO: add error handling
    } finally {
      setPost('')
      setGif({
        src: '',
        original_src: ''
      })
      setLoading(false)
    }
  }

  function handleFocus() {
    setInputProps({
      disableUnderline: false
    })
  }

  function handleBlur() {
    setInputProps({
      disableUnderline: true
    })
  }

  return (
    <div id="post-field">
      <div className="input-area">
        <Avatar src={avatar} className="post-avatar" />
        <TextField
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
