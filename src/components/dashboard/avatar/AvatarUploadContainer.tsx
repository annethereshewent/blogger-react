import { CardActions, CardContent } from '@mui/material'
import { Picture } from '../../../types/Picture'
import { CloseButton } from '../../shared/CloseButton'
import { AvatarUpload } from './AvatarUpload'

interface AvatarUploadContainerProps {
  picture: Picture
  setPicture: (picture: Picture) => void
  setOpen: (open: boolean) => void
  setDisplayEditor: (editor: boolean) => void
  currentBtn: JSX.Element
}

export function AvatarUploadContainer({
  picture,
  setPicture,
  setOpen,
  setDisplayEditor,
  currentBtn
}: AvatarUploadContainerProps) {
  function handleClose() {
    setOpen(false)
  }

  return (
    <div>
      <CardContent>
        <CloseButton handleClose={handleClose} />
        <div className="modal-body">
          <h2>Choose a profile picture</h2>
          <p>Have a selfie you'd like to share? Upload it here!</p>
        </div>
        <AvatarUpload
          picture={picture}
          setPicture={setPicture}
          setDisplayEditor={setDisplayEditor}
        />
      </CardContent>
      <CardActions>
        <div className="button-row">{currentBtn}</div>
      </CardActions>
    </div>
  )
}
