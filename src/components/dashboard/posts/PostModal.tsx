import { Avatar, Button, Card, CardActions, CardContent, CircularProgress, Modal, TextField } from "@mui/material"
import React, { useState } from "react"
import { DashboardService } from "../../../services/DashboardService"
import { Post } from "../../../types/Post"
import { modalStyleRounded } from '../../../util/modalStyles'
import { CloseButton } from "../../shared/CloseButton"
import { PostAddons } from "./PostAddons"
import { PostField } from "./PostField"


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
    setPost('')
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
    } catch (e) {
      // @TODO: add error handling
    } finally {
      setLoading(false)
      setPost('')
      setOpen(false)
    }
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card id="post-modal" style={modalStyleRounded}>
        <CloseButton handleClose={onClose} />
        <CardContent>
          <PostField
            avatar={avatar}
            posts={posts}
            setPosts={setPosts}
          />
        </CardContent>
      </Card>
    </Modal>
  )
}