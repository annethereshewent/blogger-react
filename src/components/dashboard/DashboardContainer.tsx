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
        <Grid className="dashboard-column actions-column" item sm={1} md={2} lg={2}>
          <Button className="post-button" type="button" variant="contained" onClick={openPostModal}>New Post</Button>
        </Grid>
        <Grid className="dashboard-column posts-column" item sm={11} md={8} lg={8} xl={6}>
          <PostsContainer posts={posts} />
        </Grid>
        <Grid className="dashboard-column misc-column" item lg={2}>

        </Grid>
      </Grid>
    </Box>
  )
}