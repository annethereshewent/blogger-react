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
import { DeletedPost, Post } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { modalStyle } from '../../../util/modalStyles'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'

interface PostCardMenuProps {
  post: Post
  posts?: Post[]
  user?: User
  setPosts?: (posts: Post[]) => void
  setPost?: (post: Post) => void
}

export function PostCardMenu({ post, posts, user, setPosts, setPost }: PostCardMenuProps) {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  function confirmDelete() {
    setModalOpen(true)
  }

  function openMenu() {
    setMenuOpen(true)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div ref={anchorRef} className="post-card-menu">
      {user && !post.deleted && (
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
      <ConfirmDeleteModal
        setPost={setPost}
        setPosts={setPosts}
        modalOpen={modalOpen}
        post={post}
        posts={posts}
        setMenuOpen={setMenuOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}
