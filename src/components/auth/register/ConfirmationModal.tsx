import { Modal } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { UserSocket } from "../../../util/UserSocket"
import { loginUser } from "../../../util/loginUser"
import { ConfirmationContent } from "../../shared/ConfirmationContent"


interface ConfirmationModalProps {
  email: string
  password: string
  openConfirmation: boolean
  finished: boolean
  setOpenConfirmation: (open: boolean) => void
}

export function ConfirmationModal({finished, email, password,  openConfirmation, setOpenConfirmation}: ConfirmationModalProps) {

  const navigate = useNavigate()

  const userSocket = new UserSocket()

  function finishRegistering() {
    userSocket.subscribeToUser(email, async (confirmed) => {
      if (confirmed) {
        const isLoggedIn = await loginUser(email, password)
        if (isLoggedIn) {
          navigate('/dashboard')
        }
      }
    })
  }

  useEffect(() => {
    if (finished) {
      finishRegistering()
    }
  }, [finished])

  function handleClose() {
    setOpenConfirmation(false)
  }

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