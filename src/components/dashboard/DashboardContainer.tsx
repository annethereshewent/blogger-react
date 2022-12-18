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
  const [scrollHeight, setScrollHeight] = useState(0)
  function openPostModal() {
    setOpenPostModal(true)
  }

  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  document.querySelector('#scrollable-posts')?.addEventListener('scroll', checkScroll)

  async function checkScroll(e: any) {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <= e.currentTarget.clientHeight + 100

    if (bottom && !loading) {
      setLoading(true)
      const newScrollHeight = e.currentTarget.scrollHeight

      await fetchPosts()
      if (newScrollHeight !== 0) {
        setScrollHeight(newScrollHeight)
      }
    }
  }

  useEffect(() => {
    const postId = posts.at(-1)?.id
    console.log(postId)
    const lastPostDiv = document.getElementById(`post-${postId}`)

    if (lastPostDiv != null) {
      lastPostDiv.scrollIntoView()

      // finally set a timeout of 15 seconds before allowing a new set of posts to load
      setTimeout(() => setLoading(false), 15000)
    }
  }, [scrollHeight])

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
          id="scrollable-posts"
          className="dashboard-column posts-column"
          item
          xs={11}
          md={8}
          lg={6}
        >
          <PostField posts={posts} setPosts={setPosts} avatar={user.avatars.small} />
          <PostsContainer posts={posts} fetchPosts={fetchPosts} />
          <div ref={bottomRef} />
        </Grid>
        <Grid className="dashboard-column misc-column" item xs={1} lg={3}>
          <MiscContainer />
        </Grid>
      </Grid>
    </Box>
  )
}
