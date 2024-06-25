import { IconButton, Menu, MenuItem } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'
import { useRef, useState } from 'react'
import { User } from '../../../types/user/User'
import { ConfirmDeleteModal } from './ConfirmDeleteModal'
import { Post } from '../../../types/post/Post'

interface PostCardMenuProps {
  parent?: Post
  post: Post
  posts?: Post[]
  user?: User
  setPosts?: (posts: Post[]) => void
  setPost?: (post: Post) => void
  setParent?: (post: Post) => void
}

export function PostCardMenu({
  parent,
  post,
  posts,
  user,
  setPosts,
  setPost,
  setParent
}: PostCardMenuProps) {
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
        setParent={setParent}
        modalOpen={modalOpen}
        parent={parent}
        post={post}
        posts={posts}
        setMenuOpen={setMenuOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}
