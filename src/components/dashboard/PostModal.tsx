import { Avatar, Button, Card, CardActions, CardContent, CircularProgress, Modal, TextField } from "@mui/material"
import React, { useState } from "react"
import { DashboardService } from "../../services/DashboardService"
import { Post } from "../../types/Post"
import { modalStyleRounded } from '../../util/modalStyles'
import { CloseButton } from "../shared/CloseButton"


interface PostModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  avatar: string
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export function PostModal({open, setOpen, avatar, posts, setPosts}: PostModalProps) {

  const [post, setPost] = useState('')
  const [loading, setLoading] = useState(false)

  function onClose() {
    setOpen(false)
  }

  function handlePostChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost(e.target.value)
  }

  async function submitPost() {
    try {
      setLoading(true)
      const result = await new DashboardService().submitPost(post)

      const { data } = result

      setPosts([data.post, ...posts])

      setOpen(false)
    } catch (e) {

    } finally {
      setLoading(false)
    }
  }

  console.log(avatar)

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card id="post-modal" style={modalStyleRounded}>
        <CloseButton handleClose={onClose} />
        <CardContent className="post-content">
          <Avatar src={avatar} className="post-avatar" />
          <TextField
            className="post-text-field"
            multiline
            fullWidth
            rows={4}
            variant="standard"
            placeholder="What's on your mind?"
            onChange={handlePostChange}
          />
        </CardContent>
        <CardActions>
          <div className="post-buttons">
            <Button
              className="submit-button"
              onClick={submitPost}
              variant="contained"
              color="success"
            >
              Post
            </Button>
          </div>
          { loading && <CircularProgress color="success" /> }
        </CardActions>
      </Card>
    </Modal>
  )
}