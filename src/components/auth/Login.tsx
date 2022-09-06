
import { Container, Grid } from '@mui/material'
import { Logo } from '../shared/Logo'
import '../../styles/login.scss'
import { LoginCard } from './LoginCard'
import { UserAccounts } from './UserAccounts'

export function Login() {
  return  (
    <Container id="login-main">
      <Grid container>
        <Logo />
        <Grid id="existing-user-section" xs={5} item>
          <UserAccounts />
        </Grid>
        <Grid sm={12} lg={5} item>
          <Grid id="login-column" lg={10} sm={6} item>
            <LoginCard />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}