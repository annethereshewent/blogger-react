
import { Card, CardContent, IconButton } from '@mui/material'
import { modalStyle } from '../../util/modalStyles'
import { CloseButton } from './CloseButton'

interface ConfirmationContentProps {
  handleClose: () => void
}

export function ConfirmationContent({handleClose}: ConfirmationContentProps) {
  return (
    <Card id="confirmation-modal" style={modalStyle}>
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