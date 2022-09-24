import { MoreHoriz } from '@mui/icons-material'
import { Avatar, Card, CardContent, IconButton } from '@mui/material'
import { User } from '../../../types/User'

interface UserAccountsProps {
  user: User
  open: boolean
  setOpen: (open: boolean) => void
}

export function UserAccounts({ user, open, setOpen }: UserAccountsProps) {
  function formatStr(str: string): string {
    if (str.length > 15) {
      return str.substring(0, 15) + '...'
    }

    return str
  }

  function toggleMenu() {
    setOpen(true)
  }

  return (
    <div>
      <Card className="user-card">
        <CardContent className="user-card-content">
          <Avatar src={user.avatars.small} className="avatar" />
          <div>
            <strong>{formatStr(user.username)}</strong>
            <div>{formatStr(user.email)}</div>
          </div>
          <IconButton onClick={toggleMenu}>
            <MoreHoriz />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  )
}
