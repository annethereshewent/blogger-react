import { Card, Modal } from '@mui/material'
import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { User } from '../../types/user/User'
import { modalStyleXL } from '../../util/modalStyles'
import { AvatarEditorContainer } from '../dashboard/avatar/AvatarEditorContainer'
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
  const [avatarFile, setAvatarFile] = useState<File>()
  const [bannerFile, setBannerFile] = useState<File>()
  const [zoom, setZoom] = useState(1)

  const editor = useRef<AvatarEditor>(null)

  function updateAvatar() {
    const imageUrl = editor?.current?.getImage()?.toDataURL() || ''

    const userCopy = { ...user }

    userCopy.newAvatar = imageUrl
    userCopy.avatars.medium = imageUrl

    setUser(userCopy)

    setEditAvatar(false)
  }
  function handleSlider(event: Event, value: number | number[]) {
    if (typeof value == 'number') {
      setZoom(value)
    } else {
      setZoom(value[0])
    }
  }

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
            setAvatarFile={setAvatarFile}
            setEditAvatar={setEditAvatar}
            handleClose={handleClose}
          />
        )}
        {editBanner && bannerFile && (
          <EditBannerContainer
            setEditBanner={setEditBanner}
            bannerFile={bannerFile}
            setProfileUser={setProfileUser}
            setUser={setUser}
            user={user}
          />
        )}
        {editAvatar && avatarFile && (
          <AvatarEditorContainer
            picture={{ img: avatarFile, zoom: zoom }}
            handleClose={handleClose}
            updateAvatar={updateAvatar}
            handleSlider={handleSlider}
            editor={editor}
          />
        )}
      </Card>
    </Modal>
  )
}
