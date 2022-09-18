import { Box, Button, Grid } from "@mui/material"
import { Post } from "../../types/Post"
import { User } from "../../types/User"
import { ActionsContainer } from "./ActionsContainer"
import { DashboardHeader } from "./DashboardHeader"
import { MiscContainer } from "./MiscContainer"
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
      <DashboardHeader />
      <Grid className="dashboard-body" container>
        <Grid className="dashboard-column actions-column" item xs={1} lg={3}>
          <ActionsContainer />
          <Button className="post-button" type="button" fullWidth  variant="contained" onClick={openPostModal}>CREATE</Button>
        </Grid>
        <Grid className="dashboard-column posts-column" item xs={11} md={8} lg={6} >
          <PostField
            posts={posts}
            setPosts={setPosts}
            avatar={user.avatars.small}
          />
          <PostsContainer
            posts={posts}
          />
        </Grid>
        <Grid className="dashboard-column misc-column" item xs={1} lg={3}>
          <MiscContainer />
        </Grid>
      </Grid>
    </Box>
  )
}