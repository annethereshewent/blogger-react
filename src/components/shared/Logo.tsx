import { Grid } from '@mui/material'
import '../../styles/logo.scss'

export function Logo() {
  return (
    <Grid container>
      <Grid item>
        <h1 id="title">
          <span className="bracket">[</span>
          <span className="title-text-alternate">blogger</span>
          <span className="bracket">]</span>
          <span className="period">.</span>
        </h1>
      </Grid>
    </Grid>
  )
}

export default Logo
