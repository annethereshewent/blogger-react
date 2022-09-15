import { IconButton } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { CameraAltOutlined }  from '@mui/icons-material'
import { CloseOutlined } from '@mui/icons-material'
import { Picture } from "../../types/Picture"

const BASE_URL = process.env.REACT_APP_BASE_URL

interface AvatarUploadProps {
  setPicture: (picture: Picture) => void
  setDisplayEditor: (display: boolean) => void
  picture: Picture
}

export function AvatarUpload({ setPicture, setDisplayEditor, picture }: AvatarUploadProps) {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const defaultAvatar = `${BASE_URL}/images/default_avatar.png`

  const [avatar, setAvatar] = useState(defaultAvatar)


  function handleImageClick() {
    inputFileRef?.current?.focus()
    inputFileRef?.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      const file = e.target.files[0]

      setPicture({
        ...picture,
        img: file
      })
      setDisplayEditor(true)
    }
  }

  function removeAvatar() {
    setPicture({
      ...picture,
      img: defaultAvatar
    })
  }

  useEffect(() => {
    const avatar = typeof picture.img == 'string' ? picture.img : defaultAvatar
    setAvatar(avatar)
  }, [picture])


  return (
    <div>
      <div className="avatar-image-container">
        <IconButton className="camera-button" onClick={handleImageClick}>
          <CameraAltOutlined />
        </IconButton>
        { picture.img != defaultAvatar && (
              <IconButton className="avatar-upload-close" onClick={removeAvatar}>
                <CloseOutlined />
              </IconButton>
          )
        }
        <img className="avatar-upload-image" src={avatar} />
      </div>
      <input
        type="file"
        style={{ display: 'none '}}
        ref={inputFileRef}
        onChange={handleFileChange}
      />
    </div>
  )
}