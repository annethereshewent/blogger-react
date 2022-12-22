import { CameraAltOutlined } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, IconButton, Modal } from '@mui/material'
import { User } from '../../types/user/User'
import { modalStyleLarge } from '../../util/modalStyles'
import { CloseButton } from '../shared/CloseButton'

interface EditProfileModalProps {
  open: boolean
  handleClose: () => void
  profileUser: User
}

export function EditProfileModal({ open, handleClose, profileUser }: EditProfileModalProps) {
  function updateBanner() {
    // do some stuff
  }
  return (
    <Modal id="edit-profile-modal" open={open} onClose={handleClose}>
      <Card style={modalStyleLarge}>
        <CloseButton handleClose={handleClose} />
        <span className="edit-profile-heading">Edit Profile</span>
        <Button className="save-button" variant="contained" color="success">
          Save
        </Button>
        <CardContent>
          <div className="banner">
            <IconButton className="edit-banner" onClick={updateBanner}>
              <CameraAltOutlined />
            </IconButton>
            {profileUser.banner && (
              <img src={profileUser.banner} className="banner-image" alt="banner" />
            )}
          </div>
          <div className="profile-details">
            <div className="profile-avatar">
              <img src={profileUser.avatars.medium} className="profile-image" alt="avatar" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Modal>
  )
}
