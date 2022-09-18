import { Avatar, Button, InputProps, StandardTextFieldProps, TextField } from "@mui/material"
import { useState } from "react"
import { DashboardService } from "../../services/DashboardService"
import { Post } from "../../types/Post"

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

  function handlePostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost(e.target.value)
  }

  async function submitPost() {
    try {
      setLoading(true)
      const result = await new DashboardService().submitPost(post)

      const { data } = result

      setPosts([data.post, ...posts])
    } catch (e) {
      // @ TODO: add error handling
    } finally {
      setPost('')
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
          maxRows={12}
          variant="standard"
          placeholder="What's on your mind?"
          onChange={handlePostChange}
        />
      </div>
      <div className="post-buttons">
        <Button
          className="submit-button"
          onClick={submitPost}
          variant="contained"
          color="success"
          disabled={post == ''}
        >
          Post
        </Button>
        <div style={{ clear: 'both' }} />
      </div>
    </div>
  )
}