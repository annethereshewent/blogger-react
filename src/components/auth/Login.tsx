
import { Container, Grid } from '@mui/material'
import { Logo } from '../shared/Logo'
import { useState } from 'react'
import { AddUserCard } from './AddUserCard'
import { UserCard } from './UserCard'
import { User } from '../../types/User'
import '../../styles/login.scss'
import { LoginCard } from './LoginCard'

export function Login() {

  const [accounts, setAccounts] = useState<User[]>([])

  return  (
    <Container id="login-main">
      <Grid container>
      <Logo />
      <Grid id="existing-user-section" xs={5} item>
        <Grid container>
          {
            accounts.map(account => {
              return (
                <Grid item>
                  <UserCard user={account} />
                </Grid>
              )
            })
          }
          <Grid item>
            <AddUserCard />
          </Grid>
        </Grid>
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