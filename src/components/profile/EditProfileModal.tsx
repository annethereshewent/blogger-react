import { CameraAltOutlined } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, IconButton, Modal } from '@mui/material'
import { useRef, useState } from 'react'
import { User } from '../../types/user/User'
import { modalStyleLarge } from '../../util/modalStyles'
import { CloseButton } from '../shared/CloseButton'
import { EditBannerContainer } from './EditBannerContainer'
import { EditDetailsContainer } from './EditDetailsContainer'

interface EditProfileModalProps {
  open: boolean
  handleClose: () => void
  user: User
  setUser: (user: User) => void
  setProfileUser: (user: User) => void
}

export function EditProfileModal({
  open,
  handleClose,
  user,
  setUser,
  setProfileUser
}: EditProfileModalProps) {
  const [editBanner, setEditBanner] = useState(false)
  const [editAvatar, setEditAvatar] = useState(false)
  const [bannerFile, setBannerFile] = useState<File>()

  return (
    <Modal id="edit-profile-modal" open={open} onClose={handleClose}>
      <Card style={modalStyleLarge}>
        {!editBanner && !editAvatar && (
          <EditDetailsContainer
            user={user}
            setUser={setUser}
            setProfileUser={setProfileUser}
            setEditBanner={setEditBanner}
            setBannerFile={setBannerFile}
            handleClose={handleClose}
          />
        )}
        {editBanner && <EditBannerContainer />}
      </Card>
    </Modal>
  )
}
