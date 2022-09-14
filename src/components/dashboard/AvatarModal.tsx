import { Card, CardActions, CardContent, Modal, Slider  } from "@mui/material";
import { CloseButton } from "../shared/CloseButton";
import AvatarEditor from 'react-avatar-editor'
import { useRef, useState } from "react";

interface AvatarModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

interface Picture {
  cropperOpen: boolean
  img: string
  zoom: number
  croppedImg: string
}

const BASE_URL = process.env.REACT_APP_BASE_URL

export function AvatarModal({open, setOpen}: AvatarModalProps) {
  const editor = useRef<AvatarEditor>(null)
  function handleClose() {
    setOpen(false)
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "600px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: "24px",
    p: 4,
  }

  const defaultAvatar = `${BASE_URL}/images/default_avatar.png`

  const [picture, setPicture] = useState<Picture>({
    cropperOpen: false,
    img: defaultAvatar,
    zoom: 2,
    croppedImg: defaultAvatar
  })


  function handleSlider(event: Event, value: number|number[]) {

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card id="avatar-modal" style={style}>
        <CardContent>
          <CloseButton handleClose={handleClose} />
          <div className="modal-body">
            <h2>Choose a profile picture</h2>
            <p>Have a favorite avatar? An awesome selfie? Upload it here!</p>
            <AvatarEditor
              ref={editor}
              image={picture.img}
              width={200}
              height={200}
              border={50}
              rotate={0}
              scale={picture.zoom}
            />
            <Slider
              value={picture.zoom}
              min={1}
              max={25}
              step={0.01}
              onChange={handleSlider}
            />
          </div>
        </CardContent>
        <CardActions>

        </CardActions>
      </Card>
    </Modal>
  )
}