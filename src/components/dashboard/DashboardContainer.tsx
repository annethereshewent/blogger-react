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
      <Grid container xs={12}>
        <Grid className="dashboard-column" item xs={4}>
          <Button type="button" variant="contained" onClick={openPostModal}>New Post</Button>
        </Grid>
        <Grid className="dashboard-column" item xs={4}>
          <PostsContainer posts={posts} />
        </Grid>
        <Grid className="dashboard-column" item xs={4}>

        </Grid>
      </Grid>
    </Box>
  )
}