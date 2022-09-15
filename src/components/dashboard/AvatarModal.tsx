import { Button, Card, CardActions, CardContent, Modal, Slider  } from "@mui/material"
import { CloseButton } from "../shared/CloseButton"
import AvatarEditor from 'react-avatar-editor'
import { useRef, useState } from "react"
import { AvatarUpload } from "./AvatarUpload"
import { Picture } from "../../types/Picture"
import { UserService } from "../../services/UserService"
import { User } from "../../types/User"
import { modalStyle } from "../../util/modalStyles"

interface AvatarModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  setUser: (user: User) => void
}

const BASE_URL = process.env.REACT_APP_BASE_URL

export function AvatarModal({open, setOpen, setUser}: AvatarModalProps) {
  const defaultAvatar = `${BASE_URL}/images/default_avatar.png`

  const editor = useRef<AvatarEditor>(null)
  const [picture, setPicture] = useState<Picture>({
    img: defaultAvatar,
    zoom: 1
  })

  const handleSlider = (event: Event, value: number|number[]) => {
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
    <Button className="avatar-btn" variant="contained" color="warning" onClick={handleSkip}>Skip</Button>
  )

  if (picture.img != defaultAvatar) {
    currentBtn =  (
      <Button className="avatar-btn" variant="contained" color="primary" onClick={savePicture}>Save profile picture</Button>
    )
  }

  const [displayEditor, setDisplayEditor] = useState(false)

  function handleClose() {
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

      setOpen(false)
    }
  }

  function handleSkip() {
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card id="avatar-modal" style={modalStyle}>
        { displayEditor &&
          <div className="avatar-editor">
            <CloseButton handleClose={handleClose} />
            <Button
              className="avatar-apply-btn"
              color="secondary"
              variant="contained"
              onClick={updateAvatar}
            >
              Apply
            </Button>
            <CardContent>
              <AvatarEditor
                ref={editor}
                image={picture.img}
                width={400}
                height={400}
                rotate={0}
                scale={picture.zoom}
              />

            </CardContent>
            <CardActions>
              <Slider
                className="avatar-editor-slider"
                min={1}
                max={3}
                step={0.02}
                onChange={handleSlider}
              />
            </CardActions>
          </div>
        }
        {
          !displayEditor &&
          <div>
            <CardContent>
              <CloseButton handleClose={handleClose} />
              <div className="modal-body">
                <h2>Choose a profile picture</h2>
                <p>Have a selfie you'd like to share? Upload it here!</p>
              </div>
              <AvatarUpload picture={picture} setPicture={setPicture} setDisplayEditor={setDisplayEditor} />
            </CardContent>
            <CardActions>
              <div className="button-row">
                { currentBtn }
              </div>
            </CardActions>
          </div>
        }
      </Card>
    </Modal>
  )
}