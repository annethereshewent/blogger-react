import { Button, Card, CardActions } from '@mui/material'
import { useState } from 'react'
import { User } from '../../types/User'

interface UserCardProps {
  user: User
}

export function UserCard({user}: UserCardProps) {
  return  (
    <Card>
      <img
        src={user.avatar_src}
        className="white--text align-end"
        alt="avatar"
      />
      <CardActions>
        <Button color="secondary" variant="text" onClick={login}>{ user.username }</Button>
      </CardActions>
    </Card>
  )
}

function login() {
  return false
}