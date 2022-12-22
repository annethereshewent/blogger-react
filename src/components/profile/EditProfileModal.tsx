import { Card, Modal } from '@mui/material'
import { useState } from 'react'
import { User } from '../../types/user/User'
import { modalStyleXL } from '../../util/modalStyles'
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
      <Card style={modalStyleXL}>
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
        {editBanner && bannerFile && (
          <EditBannerContainer
            setEditBanner={setEditBanner}
            bannerFile={bannerFile}
            setProfileUser={setProfileUser}
            setUser={setUser}
          />
        )}
      </Card>
    </Modal>
  )
}
