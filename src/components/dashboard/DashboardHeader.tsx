import { SearchOutlined } from "@mui/icons-material"
import { Grid, InputAdornment, TextField } from "@mui/material"
import { DashboardLogo } from "./DashboardLogo"

export function DashboardHeader() {

  return (
    <Grid id="dashboard-header" container>
      <Grid className="logo-column" item xs={1} lg={3}>
        <DashboardLogo />
      </Grid>
      <Grid className="heading-column" item xs={11} md={8} lg={6} >
        <h2 className="heading-title">Home</h2>
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