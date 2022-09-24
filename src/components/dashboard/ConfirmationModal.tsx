import { Modal } from '@mui/material'
import { useEffect } from 'react'
import { User } from '../../types/User'
import { UserSocket } from '../../util/UserSocket'
import { ConfirmationContent } from '../shared/ConfirmationContent'

interface ConfirmationModalProps {
  open: boolean
  setOpen: (confirmed: boolean) => void
  user: User
}

export function ConfirmationModal({ user, open, setOpen }: ConfirmationModalProps) {
  function handleClose() {
    setOpen(false)
  }

  useEffect(() => {
    if (!user.confirmed_at) {
      const userSocket = new UserSocket()

      userSocket.subscribeToUser(user.email, (confirmed) => {
        if (confirmed) {
          // close the modal!
          setOpen(false)
        }
      })
    }
  }, [])

  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <ConfirmationContent handleClose={handleClose} />
      </div>
    </Modal>
  )
}
