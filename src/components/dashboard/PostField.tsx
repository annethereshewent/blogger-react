import { Avatar, Button, TextField } from "@mui/material"
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

  function handlePostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost(e.target.value)
  }

  async function submitPost() {
    try {
      setLoading(true)
      const result = await new DashboardService().submitPost(post)

      const { data } = result

      setPosts([data.post, ...posts])

      setPost('')
    } catch (e) {
      // @ TODO: add error handling
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="post-field">
      <div className="input-area">
        <Avatar src={avatar} className="post-avatar" />
        <TextField
          InputProps={{ disableUnderline: true }}
          className="post-text-field"
          multiline
          fullWidth
          value={post}
          rows={3}
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
        >
          Post
        </Button>
        <div style={{ clear: 'both' }} />
      </div>
    </div>
  )
}