import { CalendarMonthOutlined } from '@mui/icons-material'
import { User } from '../../types/user/User'
import moment from 'moment'
import { Button } from '@mui/material'
import { UserService } from '../../services/UserService'

interface ProfileHeaderProps {
  profileUser: User
  user?: User
  setOpen: (open: boolean) => void
  setUser: (user: User) => void
  setProfileUser: (user: User) => void
}

export function ProfileHeader({
  profileUser,
  user,
  setUser,
  setProfileUser,
  setOpen
}: ProfileHeaderProps) {
  async function followUser() {
    try {
      const result = await new UserService().followUser(profileUser.username)

      const { data } = result

      setUser(data.user)
      setProfileUser(data.followee)
    } catch (e) {
      //@TODO
    }
  }

  return (
    <div id="profile-header">
      <div
        className="banner"
        style={{ background: profileUser.banner == null ? 'rgb(113, 118, 123)' : 'none' }}
      >
        {profileUser?.banner && (
          <img className="banner-image" src={profileUser.banner} alt="banner" />
        )}
      </div>
      <div className="profile-body">
        {user && user.username === profileUser.username && (
          <Button
            className="edit-profile-button"
            variant="outlined"
            color="info"
            onClick={() => setOpen(true)}
          >
            Edit profile
          </Button>
        )}
        {user && user.username !== profileUser.username && (
          <Button
            className="follow-user-button"
            variant="contained"
            color="info"
            onClick={followUser}
          >
            Follow
          </Button>
        )}
        <div className="profile-avatar">
          <img src={profileUser.avatars.medium} className="profile-image" alt="avatar" />
        </div>
        <div className="display-name">{profileUser.display_name}</div>
        <div className="details">
          <div className="username">@{profileUser.username}</div>
          <div className="description">{profileUser.description}</div>
          <div className="joined-date">
            <CalendarMonthOutlined className="calendar-icon" />
            <span style={{ marginLeft: '5px' }}>
              Joined {moment(profileUser.join_date).fromNow()}
            </span>
          </div>
          <div className="follow-count">
            <span className="follow-number">{profileUser.num_followed}</span>
            &nbsp;
            <span className="follow-title">Following</span>
            &nbsp;
            <span className="follow-number">{profileUser.num_followers}</span>
            &nbsp;
            <span className="follow-title">Followers</span>
          </div>
        </div>
      </div>
    </div>
  )
}
