import { Box, Button, Grid } from '@mui/material'
import { Post } from '../../types/Post'
import { User } from '../../types/User'
import { ActionsContainer } from './account/ActionsContainer'
import { DashboardHeader } from './DashboardHeader'
import { MiscContainer } from './MiscContainer'
import { PostField } from './posts/PostField'
import { PostsContainer } from './posts/PostsContainer'

interface DashboardContainerProps {
  user: User | undefined
  setOpenPostModal: (open: boolean) => void
  title: string
}

export function DashboardContainer({
  user,
  setOpenPostModal,
  title,
  children
}: React.PropsWithChildren<DashboardContainerProps>) {
  function openPostModal() {
    setOpenPostModal(true)
  }

  return (
    <Box id="dashboard-container">
      <DashboardHeader title={title} />
      <Grid className="dashboard-body" container>
        <Grid className="dashboard-column actions-column" item xs={1} lg={3}>
          <ActionsContainer user={user} />
          {/* prettier-ignore */}
          {user && (
            <Button
              className="post-button"
              type="button"
              fullWidth
              variant="contained"
              onClick={openPostModal}
            >
              CREATE
            </Button>
          )}
        </Grid>
        <Grid
          id="scrollable-target"
          className="dashboard-column posts-column"
          item
          xs={11}
          md={8}
          lg={6}
        >
          {children}
        </Grid>
        <Grid className="dashboard-column misc-column" item xs={1} lg={3}>
          <MiscContainer />
        </Grid>
      </Grid>
    </Box>
  )
}
