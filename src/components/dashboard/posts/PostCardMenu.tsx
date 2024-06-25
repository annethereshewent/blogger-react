import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Modal
} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useRef, useState } from 'react'
import { DashboardService } from '../../../services/DashboardService'
import { Post } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { modalStyle } from '../../../util/modalStyles'

interface PostCardMenuProps {
  post: Post
  posts?: Post[]
  user?: User
  setPosts?: (posts: Post[]) => void
}

export function PostCardMenu({ post, posts, user, setPosts }: PostCardMenuProps) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  function confirmDelete() {
    setModalOpen(true)
  }

  async function deletePost() {
    try {
      setLoading(true)
      const result = await new DashboardService().deletePost(post.id)

      const { data } = result

      if (data.success && setPosts != null) {
        // should be ok to use '!!' here if setPosts is not null.
        const postsCopy = [...posts!!]

        const i = postsCopy.indexOf(post)

        postsCopy.splice(i, 1)

        setPosts(postsCopy)
      }
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false)
      setModalOpen(false)
      setMenuOpen(false)
    }
  }

  function openMenu() {
    setMenuOpen(true)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleClose() {
    setModalOpen(false)
    setMenuOpen(false)
  }

  return (
    <div ref={anchorRef} className="post-card-menu">
      {user && (
        <div>
          <IconButton className="hamburger" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            open={menuOpen}
            onClose={closeMenu}
            anchorEl={anchorRef.current}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center'
            }}
          >
            {post.user.username === user.username && (
              <MenuItem onClick={confirmDelete}>Delete post</MenuItem>
            )}
            {post.user.username !== user.username && (
              <MenuItem>block @{post.user.username}</MenuItem>
            )}
          </Menu>
        </div>
      )}
      {/* @TODO: move this to its own component */}
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
          </CardActions>
        </Card>
      </Modal>
    </div>
  )
}
