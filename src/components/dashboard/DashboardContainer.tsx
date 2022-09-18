import { Box, Button, Grid } from "@mui/material"
import { Post } from "../../types/Post"
import { User } from "../../types/User"
import { PostField } from "./PostField"
import { PostsContainer } from "./PostsContainer"


interface DashboardContainerProps {
  user: User
  setOpenPostModal: (open: boolean) => void
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export function DashboardContainer({ user, posts, setOpenPostModal, setPosts }: DashboardContainerProps) {
  function openPostModal() {
    setOpenPostModal(true)
  }

  return (
    <Box id="dashboard-container">
      <Grid className="dashboard-body" container>
        <Grid className="dashboard-column actions-column" item sm={1} md={2} lg={2}>
          <Button className="post-button" type="button" fullWidth  variant="contained" onClick={openPostModal}>CREATE</Button>
        </Grid>
        <Grid className="dashboard-column posts-column" item sm={11} md={8} lg={8} xl={6}>
          <PostField
            posts={posts}
            setPosts={setPosts}
            avatar={user.avatars.small}
          />
          <PostsContainer posts={posts} />
        </Grid>
        <Grid className="dashboard-column misc-column" item lg={2}>

        </Grid>
      </Grid>
    </Box>
  )
}