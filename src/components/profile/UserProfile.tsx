import { Box, Button, Grid } from '@mui/material'
import { DashboardHeader } from '../dashboard/DashboardHeader'
import '../../styles/dashboard.scss'
import { ActionsContainer } from '../dashboard/account/ActionsContainer'
import { PostsContainer } from '../dashboard/posts/PostsContainer'
import { useState } from 'react'
import { User } from '../../types/User'
import { useUser } from '../../hooks/useUser'
import { DashboardContainer } from '../dashboard/DashboardContainer'
import { PostField } from '../dashboard/posts/PostField'
import { ConfirmationModal } from '../dashboard/ConfirmationModal'
import { PostModal } from '../dashboard/posts/PostModal'
import { AvatarModal } from '../dashboard/avatar/AvatarModal'
import { Post } from '../../types/Post'

export function UserProfile() {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [openPostModal, setOpenPostModal] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [openAvatar, setOpenAvatar] = useState(false)

  async function fetchPosts() {
    //
  }

  useUser(setLoading, setUser, setOpenConfirmation)

  return (
    <div>
      <DashboardContainer user={user} setOpenPostModal={setOpenPostModal}>
        {user && (
          <PostsContainer
            posts={posts}
            fetchPosts={fetchPosts}
            hasMore={hasMore}
            setHasMore={setHasMore}
            setPosts={setPosts}
            user={user}
          />
        )}
      </DashboardContainer>
      <ConfirmationModal user={user} open={openConfirmation} setOpen={setOpenConfirmation} />
      <AvatarModal open={openAvatar} setOpen={setOpenAvatar} setUser={setUser} />
      <PostModal
        open={openPostModal}
        avatar={user?.avatars?.small}
        setOpen={setOpenPostModal}
        posts={posts}
        setPosts={setPosts}
      />
    </div>
  )
}
