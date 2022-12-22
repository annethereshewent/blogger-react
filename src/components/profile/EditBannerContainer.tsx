import { ArrowBack } from '@mui/icons-material'
import { Button, CardActions, CardContent, IconButton, Slider } from '@mui/material'
import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { UserService } from '../../services/UserService'
import { User } from '../../types/user/User'
import { CloseButton } from '../shared/CloseButton'

interface EditBannerContainerProps {
  setEditBanner: (edit: boolean) => void
  bannerFile: File
  setProfileUser: (user: User) => void
  setUser: (user: User) => void
}

export function EditBannerContainer({
  setEditBanner,
  setUser,
  setProfileUser,
  bannerFile
}: EditBannerContainerProps) {
  const [zoom, setZoom] = useState(1)
  const editor = useRef<AvatarEditor>(null)

  async function saveBanner() {
    const bannerUrl = editor?.current?.getImage()?.toDataURL() || ''
    try {
      const result = await new UserService().updateBanner(bannerUrl)

      const { data } = result

      setUser(data.user)
      setProfileUser(data.user)
    } catch (e) {
      //@TODO
    } finally {
      setEditBanner(false)
    }
  }

  function handleZoom(e: Event, value: number | number[]) {
    if (typeof value === 'number') {
      setZoom(value)
    } else {
      setZoom(value[0])
    }
  }

  return (
    <div id="edit-banner">
      <IconButton onClick={() => setEditBanner(false)}>
        <ArrowBack />
      </IconButton>
      <span className="edit-profile-heading">Edit Profile</span>
      <Button className="save-button" variant="contained" color="success" onClick={saveBanner}>
        Apply
      </Button>
      <CardContent>
        <AvatarEditor
          style={{ width: '98%', margin: 'auto' }}
          ref={editor}
          image={bannerFile}
          width={700}
          height={200}
          rotate={0}
          scale={zoom}
        />
      </CardContent>
      <CardActions>
        <Slider
          className="avatar-editor-slider"
          min={1}
          max={3}
          step={0.02}
          onChange={handleZoom}
        />
      </CardActions>
    </div>
  )
}
