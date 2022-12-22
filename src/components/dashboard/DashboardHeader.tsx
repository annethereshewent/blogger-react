import { SearchOutlined } from '@mui/icons-material'
import { Grid, InputAdornment, TextField } from '@mui/material'
import { DashboardLogo } from './DashboardLogo'

interface DashboardHeaderProps {
  title: string
  count?: number
}

export function DashboardHeader({ title, count }: DashboardHeaderProps) {
  return (
    <Grid id="dashboard-header" container>
      <Grid className="logo-column" item xs={1} lg={3}>
        <DashboardLogo />
      </Grid>
      <Grid className="heading-column" item xs={11} md={8} lg={6}>
        <div className="heading-section">
          <div className="heading-title">{title}</div>
          {count && <div className="post-count">{count} posts</div>}
        </div>
      </Grid>
      <Grid className="search-column" item xs={1} lg={3}>
        <TextField
          className="search-text-field"
          fullWidth
          placeholder="Search Blogger"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  )
}
