import { IconButton } from "@mui/material"
import { HomeOutlined, MailOutline, NotificationsOutlined, PersonOutlined, SearchOutlined } from '@mui/icons-material'
import { UserAccounts } from "./UserAccounts"
import { User } from "../../../types/User"
import { AccountMenu } from "./AccountMenu"
import { useRef, useState } from "react"

interface ActionsContainerProps {
  user: User
}

export function ActionsContainer({user}: ActionsContainerProps) {

  const anchorRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  function handleMenuClick() {
    console.log('wut')
    setOpen(!open)
  }

  return (
    <div className="actions-container">
      <div className="action">
        <IconButton className="icon">
          <HomeOutlined />
          <span className="icon-text">Home</span>
        </IconButton>
      </div>
      <div style={{ clear: 'both' }} />
      <div className="action search-action">
        <IconButton className="icon">
          <SearchOutlined />
        </IconButton>
      </div>
      <div style={{ clear: 'both' }} />
      <div className="action">
        <IconButton className="icon">
          <NotificationsOutlined />
          <span className="icon-text">Notifications</span>
        </IconButton>
      </div>
      <div style={{ clear: 'both' }} />
      <div className="action">
        <IconButton className="icon">
          <MailOutline />
          <span className="icon-text">Messages</span>
        </IconButton>
      </div>
      <div style={{ clear: 'both' }} />
      <div className="action">
        <IconButton className="icon">
          <PersonOutlined />
          <span className="icon-text">Profile</span>
        </IconButton>
      </div>
      <div className="user-accounts-wrapper">
        <div ref={anchorRef} onClick={handleMenuClick}>
          <UserAccounts
            user={user}
            setOpen={setOpen}
            open={open}
          />
        </div>
        <AccountMenu
          anchorRef={anchorRef}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  )
}