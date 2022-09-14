
import { Card, CardContent, IconButton } from '@mui/material'
import { CloseButton } from './CloseButton'

interface ConfirmationContentProps {
  handleClose: () => void
}

export function ConfirmationContent({handleClose}: ConfirmationContentProps) {

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

  return (
    <Card id="confirmation-modal" style={style}>
      <CardContent>
        <CloseButton handleClose={handleClose} />
        <div className="confirmation-body">
          <h2 className="confirm-heading">Please confirm your email</h2>
          <p className="confirm-title">Once your email is confirmed, you will be redirected to the next screen.</p>
        </div>
      </CardContent>
    </Card>
  )
}