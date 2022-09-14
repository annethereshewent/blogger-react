import { Button, Card, CardActions, CardContent, Modal, Slider  } from "@mui/material";
import { CloseButton } from "../shared/CloseButton";
import AvatarEditor from 'react-avatar-editor'
import { useEffect, useRef, useState } from "react";
import { AvatarUpload } from "./AvatarUpload";
import { Picture } from "../../types/Picture";

interface AvatarModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const BASE_URL = process.env.REACT_APP_BASE_URL

export function AvatarModal({open, setOpen}: AvatarModalProps) {
  const defaultAvatar = `${BASE_URL}/images/default_avatar.png`

  const editor = useRef<AvatarEditor>(null)
  const [picture, setPicture] = useState<Picture>({
    img: defaultAvatar,
    zoom: 1
  })

  console.log('right before useState picture is used')
  console.log(picture.zoom)

  const handleSlider = (event: Event, value: number|number[]) => {
    let zoom = 0

    if (typeof value == 'number') {
      zoom = value
    } else {
      zoom = value[0]
    }

    console.log('inside handleSlider')
    console.log(picture.zoom)

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

  const avatarEditor = (
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
        <Slider
          className="avatar-editor-slider"
          min={1}
          max={3}
          step={0.02}
          onChange={handleSlider}
        />
      </CardContent>
    </div>
  )

  const avatarUpload = (
    <div>
      <CardContent>
        <CloseButton handleClose={handleClose} />
        <div className="modal-body">
          <h2>Choose a profile picture</h2>
          <p>Have a favorite avatar? An awesome selfie? Upload it here!</p>
        </div>
        <AvatarUpload picture={picture} setPicture={setPicture} setDisplayEditor={setDisplayEditor} />
      </CardContent>
      <CardActions>
        <div className="button-row">
          { currentBtn }
        </div>
      </CardActions>
    </div>
  )

  console.log('inside main component function')
  console.log(picture.zoom)

  const [container, setContainer] = useState(avatarUpload)

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

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: "600px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: "24px",
    p: 4,
  }

  function changeImage() {

  }

  function savePicture() {

  }

  function handleSkip() {

  }


  useEffect(() => {
    if (displayEditor) {
      setContainer(avatarEditor)
    } else {
      console.log('setting container to avatarUpload')
      setContainer(avatarUpload)
    }
  }, [displayEditor])

  useEffect(() => {
    const avatarEditor = (
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
          <Slider
            className="avatar-editor-slider"
            min={1}
            max={3}
            step={0.02}
            onChange={handleSlider}
          />
        </CardContent>
      </div>
    )


    if (picture.img != defaultAvatar && displayEditor) {
      setContainer(avatarEditor)
    }
  }, [picture])


  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card id="avatar-modal" style={style}>
        { container }
      </Card>
    </Modal>
  )
}