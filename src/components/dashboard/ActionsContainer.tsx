import { IconButton } from "@mui/material";
import { HomeOutlined, MailOutline, NotificationsOutlined, PersonOutlined } from '@mui/icons-material'

export function ActionsContainer() {

  return (
    <div className="actions-container">
      <div className="action">
        <IconButton className="icon">
          <HomeOutlined />
        </IconButton>
        <span className="icon-text">Home</span>
      </div>
      <div style={{ clear: 'both' }} />
      <div className="action">
        <IconButton className="icon">
          <NotificationsOutlined />
        </IconButton>
        <span className="icon-text">Notifications</span>
      </div>
      <div style={{ clear: 'both' }} />
      <div className="action">
        <IconButton className="icon">
          <MailOutline />
        </IconButton>
        <span className="icon-text">Messages</span>
      </div>
      <div style={{ clear: 'both' }} />
      <div className="action">
        <IconButton className="icon">
          <PersonOutlined />
        </IconButton>
        <span className="icon-text">Profile</span>
      </div>
    </div>
  )
}