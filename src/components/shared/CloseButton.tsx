import { IconButton } from '@mui/material'
import { CloseRounded } from '@mui/icons-material'

interface CloseButtonProps {
  handleClose: () => void
}

export function CloseButton({ handleClose }: CloseButtonProps) {
  return (
    <IconButton onClick={handleClose}>
      <CloseRounded />
    </IconButton>
  )
}
