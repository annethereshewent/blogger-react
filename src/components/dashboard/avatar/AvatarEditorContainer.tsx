import { Button, CardActions, CardContent, Slider } from '@mui/material'
import AvatarEditor from 'react-avatar-editor'
import { Picture } from '../../../types/user/Picture'
import { CloseButton } from '../../shared/CloseButton'

interface AvatarEditorContainerProps {
  handleClose: () => void
  updateAvatar: () => void
  picture: Picture
  handleSlider: (event: Event, value: number | number[]) => void
  editor: React.RefObject<AvatarEditor>
}

export function AvatarEditorContainer({
  handleClose,
  updateAvatar,
  picture,
  handleSlider,
  editor
}: AvatarEditorContainerProps) {
  return (
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
  )
}
