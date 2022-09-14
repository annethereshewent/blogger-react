import { Button, Card, CardActions, CardContent, IconButton, Modal } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'

interface ConfirmationModalProps {
  openConfirmation: boolean
  setOpenConfirmation: (open: boolean) => void
}

export function ConfirmationModal({openConfirmation, setOpenConfirmation}: ConfirmationModalProps) {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: "24px",
    p: 4
  }

  function handleClose() {
    setOpenConfirmation(false)
  }

  return (
    <Modal
      open={openConfirmation}
      onClose={handleClose}
    >
      <Card id="confirmation-modal" style={style}>
        <CardContent>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <div className="confirmation-body">
            <h2 className="confirm-heading">Please confirm your email</h2>
            <p className="confirm-title">Once your email is confirmed, you will be redirected to the next screen.</p>
          </div>
        </CardContent>
      </Card>
    </Modal>
  )
}