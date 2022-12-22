import { CameraAltOutlined, CloseOutlined } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  CardContent,
  Avatar
} from '@mui/material'
import { useRef, useState } from 'react'
import { UserService } from '../../services/UserService'
import { User } from '../../types/user/User'
import { CloseButton } from '../shared/CloseButton'

interface EditDetailsContainerProps {
  user: User
  setUser: (user: User) => void
  setProfileUser: (user: User) => void
  setEditBanner: (edit: boolean) => void
  setBannerFile: (file: File) => void
  handleClose: () => void
}

export function EditDetailsContainer({
  user,
  setUser,
  setProfileUser,
  setEditBanner,
  setBannerFile,
  handleClose
}: EditDetailsContainerProps) {
  const [gender, setGender] = useState(user.gender)
  const [displayName, setDisplayName] = useState(user.display_name)
  const [description, setDescription] = useState(user.description)
  function updateBanner() {
    // open the file input
    bannerRef?.current?.focus()
    bannerRef?.current?.click()
  }

  function removeBanner() {
    const userCopy = { ...user }
    userCopy.banner = undefined

    setUser(userCopy)
  }

  const bannerRef = useRef<HTMLInputElement>(null)

  function handleBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      // do something
      const file = e.target.files[0]

      setBannerFile(file)
      setEditBanner(true)
    }
  }

  function handleGender(e: React.ChangeEvent<HTMLInputElement>) {
    setGender(e.target.value)
  }

  function handleDisplayName(e: React.ChangeEvent<HTMLInputElement>) {
    setDisplayName(e.target.value)
  }

  function handleDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value)
  }

  async function saveDetails() {
    try {
      const result = await new UserService().saveDetails(
        description,
        gender,
        displayName,
        user.banner
      )

      const { data } = result

      setUser(data.user)
      setProfileUser(data.user)

      handleClose()
    } catch (e) {
      //@TODO
    }
  }

  return (
    <div id="edit-details">
      <CloseButton handleClose={handleClose} />
      <span className="edit-profile-heading">Edit Profile</span>
      <Button className="save-button" variant="contained" color="success" onClick={saveDetails}>
        Save
      </Button>
      <div className="banner">
        <IconButton className="edit-banner" onClick={updateBanner}>
          <CameraAltOutlined />
        </IconButton>
        {user.banner != null && (
          <IconButton className="remove-banner" onClick={removeBanner}>
            <CloseOutlined />
          </IconButton>
        )}
        {user.banner && <img src={user.banner} className="banner-image" alt="banner" />}
      </div>
      <CardContent>
        <div className="profile-details">
          <div className="profile-avatar">
            <Avatar
              src={user.avatars.medium}
              sx={{ height: 'auto', marginBottom: '20px' }}
              className="profile-image"
              alt="avatar"
            />
          </div>
          <form>
            <TextField
              className="details-input"
              placeholder="Name"
              value={displayName}
              onChange={handleDisplayName}
            ></TextField>
            <TextField
              className="details-input description"
              placeholder="description"
              rows={4}
              multiline
              value={description}
              onChange={handleDescription}
            ></TextField>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup value={gender} onChange={handleGender} row>
                <FormControlLabel value="F" control={<Radio required />} label="Female" />
                <FormControlLabel value="M" control={<Radio required />} label="Male" />
                <FormControlLabel value="X" control={<Radio required />} label="Other" />
              </RadioGroup>
            </FormControl>
          </form>
        </div>
        <input
          style={{ display: 'none' }}
          type="file"
          ref={bannerRef}
          onChange={handleBannerChange}
        />
      </CardContent>
    </div>
  )
}
