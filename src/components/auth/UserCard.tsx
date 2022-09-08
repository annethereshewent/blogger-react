import { Button, Card, CardActions } from '@mui/material'
import { User } from '../../types/User'

interface UserCardProps {
  user: User
}

export function UserCard({user}: UserCardProps) {

  function login() {

  }
  return  (
    <Card>
      <img
        src={user.avatars.medium}
        className="white--text align-end"
        alt="avatar"
      />
      <CardActions>
        <Button color="secondary" variant="text" onClick={login}>{ user.username }</Button>
      </CardActions>
    </Card>
  )
}
