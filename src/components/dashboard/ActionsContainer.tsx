import { IconButton } from "@mui/material";
import { HomeOutlined, MailOutline, NotificationsOutlined, PersonOutlined } from '@mui/icons-material'

export function ActionsContainer() {

  return (
    <div className="actions-container">
      <div className="action">
        <IconButton>
          <HomeOutlined />
        </IconButton>
        <span className="icon-text">Home</span>
      </div>
      <div className="action">
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <span className="icon-text">Notifications</span>
      </div>
      <div className="action">
        <IconButton>
          <MailOutline />
        </IconButton>
        <span className="icon-text">Messages</span>
      </div>
      <div className="action">
        <IconButton>
          <PersonOutlined />
        </IconButton>
        <span className="icon-text">Profile</span>
      </div>
    </div>
  )
}