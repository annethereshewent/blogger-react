import { Button, Card, CardActions, CardContent, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { RegisterContainer } from './RegisterContainer'
import { PasswordContainer } from './PasswordContainer'
import { AuthService } from '../../../services/AuthService'
import { User } from '../../../types/User'
import { CloseButton } from '../../shared/CloseButton'
import { modalStyle } from '../../../util/modalStyles'

interface RegisterModalProps {
  openRegister: boolean,
  setOpenRegister: (active: boolean) => void
  setOpenConfirmation: (active: boolean) => void
  onChangeEmail: (email: string) => void
  onChangePassword: (password: string) => void
  onFinishRegister: () => void
}

export function RegisterModal({openRegister, setOpenRegister, setOpenConfirmation, onChangeEmail, onChangePassword, onFinishRegister}: RegisterModalProps) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [buttonTxt, setButtonTxt] = useState('Next')
  const [password, setPassword] = useState('')
  const [finished, setFinished] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  const [usernameExists, setUsernameExists] = useState(false)

  const registerContainer = (
    <RegisterContainer
      setEmail={setEmail}
      setUsername={setUsername}
      setGender={setGender}
      email={email}
      username={username}
      gender={gender}
      setUsernameExists={setUsernameExists}
      setEmailExists={setEmailExists}
    />
  )

  useEffect(() => {
    onChangeEmail(email)
    onChangePassword(password)
  }, [email, password])

  useEffect(() => {
    if (finished) {
      onFinishRegister()
    }
  }, [finished])

  const passwordContainer = <PasswordContainer password={password} setPassword={setPassword} />

  const [currentContainer, setContainer] = useState(registerContainer)

  function handleClose() {
    setContainer(registerContainer)
    setButtonTxt('Next')
    setOpenRegister(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    switch(buttonTxt) {
      case 'Next':
        setContainer(passwordContainer)
        setButtonTxt('Finish')
        break
      case 'Finish':
        const result = await new AuthService().reigster(username, email, password, gender)
        const { data } = result

        const user: User = data.user

        if (user != null) {
          setContainer(passwordContainer)
          setButtonTxt('Next')
          handleClose()

          // finally open the email verification modal
          setFinished(true)
          setOpenConfirmation(true)
        }
        break
    }
  }

  return (
    <Modal
      open={openRegister}
      onClose={handleClose}
    >
      <Card id="register-modal" style={modalStyle}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <CloseButton handleClose={handleClose} />
            { currentContainer }
          </CardContent>
          <CardActions>
            <div className="button-row">
              <Button
                className="register-button"
                type="submit"
                variant="contained"
                color="primary"
                disabled={usernameExists || emailExists}
              >
                {buttonTxt}
              </Button>
            </div>
          </CardActions>
        </form>
      </Card>
    </Modal>
  )
}