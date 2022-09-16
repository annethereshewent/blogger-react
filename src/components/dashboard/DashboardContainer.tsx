import { Box, Button, Grid } from "@mui/material"
import { Post } from "../../types/Post"
import { User } from "../../types/User"
import { PostsContainer } from "./PostsContainer"


interface DashboardContainerProps {
  user: User
  setOpenPostModal: (open: boolean) => void
  posts: Post[]
}

export function DashboardContainer({ user, posts, setOpenPostModal }: DashboardContainerProps) {
  function openPostModal() {
    setOpenPostModal(true)
  }

  return (
    <Box id="dashboard-container">
      <Grid className="dashboard-body" container>
        <Grid className="dashboard-column actions-column" item xs={2}>
          <Button type="button" variant="contained" onClick={openPostModal}>New Post</Button>
        </Grid>
        <Grid className="dashboard-column posts-column" item xs={5}>
          <PostsContainer posts={posts} />
        </Grid>
        <Grid className="dashboard-column misc-column" item xs={3}>

        </Grid>
      </Grid>
    </Box>
  )
}