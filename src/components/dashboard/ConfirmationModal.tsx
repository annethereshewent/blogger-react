import { Modal } from "@mui/material";
import { User } from "../../types/User";
import { UserSocket } from "../../util/UserSocket";
import { ConfirmationContent } from "../shared/ConfirmationContent";


interface ConfirmationModalProps {
  openConfirmation: boolean
  setOpenConfirmation: (confirmed: boolean) => void
  user: User
}

export function ConfirmationModal({user, openConfirmation, setOpenConfirmation}: ConfirmationModalProps) {
  function handleClose() {
    setOpenConfirmation(false)
  }

  const userSocket = new UserSocket()

  userSocket.subscribeToUser(user.email, (confirmed) => {
    if (confirmed) {
      // close the modal!
      setOpenConfirmation(false)
    }
  })

  return (
    <Modal
      open={openConfirmation}
      onClose={handleClose}
    >
      <div>
        <ConfirmationContent handleClose={handleClose} />
      </div>
    </Modal>
  )
}