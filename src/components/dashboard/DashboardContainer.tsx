import { Box, Button, Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Post } from '../../types/Post'
import { User } from '../../types/User'
import { ActionsContainer } from './account/ActionsContainer'
import { DashboardHeader } from './DashboardHeader'
import { MiscContainer } from './MiscContainer'
import { PostField } from './posts/PostField'
import { PostsContainer } from './posts/PostsContainer'

interface DashboardContainerProps {
  user: User
  setOpenPostModal: (open: boolean) => void
  posts: Post[]
  setPosts: (posts: Post[]) => void
  fetchPosts: () => void
}

export function DashboardContainer({
  user,
  posts,
  setOpenPostModal,
  setPosts,
  fetchPosts
}: DashboardContainerProps) {
  function openPostModal() {
    setOpenPostModal(true)
  }

  return (
    <Box id="dashboard-container">
      <DashboardHeader />
      <Grid className="dashboard-body" container>
        <Grid className="dashboard-column actions-column" item xs={1} lg={3}>
          <ActionsContainer user={user} />
          {/* prettier-ignore */}
          <Button
            className="post-button"
            type="button"
            fullWidth
            variant="contained"
            onClick={openPostModal}
          >
            CREATE
          </Button>
        </Grid>
        <Grid
          id="scrollable-target"
          className="dashboard-column posts-column"
          item
          xs={11}
          md={8}
          lg={6}
        >
          <PostField posts={posts} setPosts={setPosts} avatar={user.avatars.small} />
          <PostsContainer posts={posts} fetchPosts={fetchPosts} />
        </Grid>
        <Grid className="dashboard-column misc-column" item xs={1} lg={3}>
          <MiscContainer />
        </Grid>
      </Grid>
    </Box>
  )
}
