
import { Grid } from '@mui/material'
import { UserCard } from './UserCard'
import { AddUserCard } from './AddUserCard'
import { useState } from 'react'
import { User } from '../../../types/User'

export function UserAccounts() {
  const [accounts, setAccounts] = useState<User[]>([])

  return (
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
  )
}