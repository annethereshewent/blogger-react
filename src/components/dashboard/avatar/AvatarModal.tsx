import { Button, Card, CardActions, CardContent, Modal, Slider } from '@mui/material'
import { CloseButton } from '../../shared/CloseButton'
import AvatarEditor from 'react-avatar-editor'
import { useRef, useState } from 'react'
import { Picture } from '../../../types/user/Picture'
import { UserService } from '../../../services/UserService'
import { User } from '../../../types/user/User'
import { modalStyleLarge } from '../../../util/modalStyles'
import { AvatarUploadContainer } from './AvatarUploadContainer'
import { AvatarEditorContainer } from './AvatarEditorContainer'
import { DashboardService } from '../../../services/DashboardService'

interface AvatarModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  setUser: (user: User) => void
}

const BASE_URL = process.env.REACT_APP_BASE_URL

export function AvatarModal({ open, setOpen, setUser }: AvatarModalProps) {
  const defaultAvatar = `${BASE_URL}/images/default_avatar.png`

  const editor = useRef<AvatarEditor>(null)
  const [picture, setPicture] = useState<Picture>({
    img: defaultAvatar,
    zoom: 1
  })

  const handleSlider = (event: Event, value: number | number[]) => {
    let zoom = 0

    if (typeof value == 'number') {
      zoom = value
    } else {
      zoom = value[0]
    }

    setPicture({
      ...picture,
      zoom
    })
  }

  let currentBtn = (
    <Button className="avatar-btn" variant="contained" color="warning" onClick={handleSkip}>
      Skip
    </Button>
  )

  if (picture.img != defaultAvatar) {
    currentBtn = (
      <Button className="avatar-btn" variant="contained" color="primary" onClick={savePicture}>
        Save profile picture
      </Button>
    )
  }

  const [displayEditor, setDisplayEditor] = useState(false)

  function handleClose() {
    try {
      new DashboardService().hideAvatarDialog()
    } catch (e) {
      //@TODO
    }
    setOpen(false)
  }

  function updateAvatar() {
    const imageUrl = editor?.current?.getImage()?.toDataURL() || defaultAvatar

    setPicture({
      ...picture,
      img: imageUrl
    })

    setDisplayEditor(false)
  }

  async function savePicture() {
    if (typeof picture.img == 'string') {
      const result = await new UserService().updateAvatar(picture.img)

      const { data } = result

      if (data.user != null) {
        setUser(data.user)
      }
      new DashboardService().hideAvatarDialog()
      setOpen(false)
    }
  }

  function handleSkip() {
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Card id="avatar-modal" style={modalStyleLarge}>
        {displayEditor && (
          <AvatarEditorContainer
            handleClose={handleClose}
            picture={picture}
            handleSlider={handleSlider}
            editor={editor}
            updateAvatar={updateAvatar}
          />
        )}
        {!displayEditor && (
          <AvatarUploadContainer
            picture={picture}
            setPicture={setPicture}
            setOpen={setOpen}
            setDisplayEditor={setDisplayEditor}
            currentBtn={currentBtn}
          />
        )}
      </Card>
    </Modal>
  )
}
