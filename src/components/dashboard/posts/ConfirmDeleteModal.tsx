import { Button, Card, CardActions, CardContent, CircularProgress, Modal } from '@mui/material'
import { modalStyle } from '../../../util/modalStyles'
import { useState } from 'react'
import { DeletedPost, Post } from '../../../types/post/Post'
import { DashboardService } from '../../../services/DashboardService'

interface ConfirmDeleteModalProps {
  parent?: Post
  post: Post
  posts?: Post[]
  modalOpen: boolean
  setPosts?: (posts: Post[]) => void
  setPost?: (post: Post) => void
  setParent?: (post: Post) => void
  setMenuOpen: (open: boolean) => void
  setModalOpen: (open: boolean) => void
}

export function ConfirmDeleteModal({
  parent,
  post,
  posts,
  modalOpen,
  setPost,
  setPosts,
  setParent,
  setMenuOpen,
  setModalOpen
}: ConfirmDeleteModalProps) {
  const [loading, setLoading] = useState(false)

  function handleClose() {
    setModalOpen(false)
    setMenuOpen(false)
  }

  async function deletePost() {
    try {
      if (!post.deleted) {
        setLoading(true)
        const result = await new DashboardService().deletePost(post.id)

        const { data } = result

        if (data.success) {
          if (setPosts != null) {
            // should be ok to use '!!' here if setPosts is not null.
            const postsCopy = [...posts!!]

            const i = postsCopy.indexOf(post)

            if (i !== -1) {
              postsCopy.splice(i, 1)

              setPosts(postsCopy)
            }

            // lastly update reply count for parent of this post
            if (setParent != null && parent != null && !parent.deleted) {
              parent.reply_count--

              setParent(parent)
            }
          } else if (setPost != null) {
            const deletedPost: DeletedPost = { id: post.id, deleted: true }

            setPost(deletedPost)
          }
        }
      }
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false)
      setModalOpen(false)
      setMenuOpen(false)
    }
  }

  return (
    <Modal id="delete-post-modal" open={modalOpen} onClose={handleClose}>
      <Card className="confirm-delete" style={modalStyle}>
        <CardContent>
          <h4 className="delete-heading">Confirm delete</h4>
          <p className="delete-body">
            Are you sure you want to delete this post? <br />
            This action cannot be undone!
          </p>
        </CardContent>
        <CardActions className="delete-actions">
          <Button type="button" variant="contained" color="error" onClick={deletePost}>
            Delete
          </Button>
          <Button type="button" variant="contained" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress style={{ textAlign: 'center' }} color="error" />
            </div>
          )}
        </CardActions>
      </Card>
    </Modal>
  )
}
