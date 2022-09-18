import { IconButton } from "@mui/material";
import { HomeOutlined, MailOutline, NotificationsOutlined, PersonOutlined } from '@mui/icons-material'

export function ActionsContainer() {

  return (
    <div className="actions-container">
      <div className="action">
        <IconButton className="icon">
          <HomeOutlined />
          <span className="icon-text">Home</span>
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
    </div>
  )
}