import { CalendarMonthOutlined } from '@mui/icons-material'
import { User } from '../../types/user/User'
import moment from 'moment'
import { Button } from '@mui/material'

interface ProfileHeaderProps {
  profileUser: User
  setOpen: (open: boolean) => void
}

export function ProfileHeader({ profileUser, setOpen }: ProfileHeaderProps) {
  return (
    <div id="profile-header">
      <div className="banner">
        {profileUser?.banner && (
          <img className="banner-image" src={profileUser.banner} alt="banner" />
        )}
      </div>
      <div className="profile-body">
        <Button
          className="edit-profile-button"
          variant="outlined"
          color="info"
          onClick={() => setOpen(true)}
        >
          Edit profile
        </Button>
        <div className="profile-avatar">
          <img src={profileUser.avatars.medium} className="profile-image" alt="avatar" />
        </div>
        <div className="display-name">{profileUser.display_name}</div>
        <div className="description">{profileUser.description}</div>
        <div className="details">
          <div className="username">@{profileUser.username}</div>
          <div className="joined-date">
            <CalendarMonthOutlined className="calendar-icon" />
            <span style={{ marginLeft: '5px' }}>
              Joined {moment(profileUser.join_date).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
