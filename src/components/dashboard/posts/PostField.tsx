import { Avatar, Button, CircularProgress, InputProps, TextField } from "@mui/material"
import { useState } from "react"
import { DashboardService } from "../../../services/DashboardService"
import { Post } from "../../../types/Post"
import { PostAddons } from "./PostAddons"
import { IGif } from '@giphy/js-types'
import { Gif } from "@giphy/react-components"
import { GifItem } from "../gifs/GifItem"
import { GifElement } from "./GifElement"
import { PostRequest } from "../../../types/PostRequest"

interface PostFieldProps {
  avatar: string
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export function PostField({avatar, posts, setPosts}: PostFieldProps) {

  const [post, setPost] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputProps, setInputProps] = useState<Partial<InputProps>>({
    disableUnderline: true
  })
  const [gif, setGif] = useState('')


  function handlePostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost(e.target.value)
  }

  async function submitPost() {
    try {
      setLoading(true)

      const postRequest: PostRequest = {
        body: post
      }

      if (gif != '') {
        postRequest.gif = gif
      }

      //@TODO: handle images here

      const result = await new DashboardService().submitPost(postRequest)

      const { data } = result

      setPosts([data.post, ...posts])
    } catch (e) {
      // @ TODO: add error handling
    } finally {
      setPost('')
      setGif('')
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
      { gif != '' && <GifElement src={gif} /> }
      <div className="post-buttons-wrapper">
        <PostAddons
          setGif={setGif}
        />
        <div className="post-buttons">
          <Button
            className="submit-button"
            onClick={submitPost}
            variant="contained"
            color="success"
            disabled={post == '' && gif == ''}
          >
            Post
          </Button>
          <div style={{ clear: 'both' }} />
        </div>
        { loading && <CircularProgress color="success" /> }
      </div>
    </div>
  )
}