import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

interface CloseButtonProps {
  handleClose: () => void
}

export function CloseButton({handleClose}: CloseButtonProps) {

  return (
    <IconButton onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  )
}