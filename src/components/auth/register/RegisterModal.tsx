import { Alert, Button, Card, CardActions, CardContent, Modal } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { RegisterContainer } from './RegisterContainer'
import { PasswordContainer } from './PasswordContainer'
import { AuthService } from '../../../services/AuthService'
import { User } from '../../../types/user/User'
import { CloseButton } from '../../shared/CloseButton'
import { modalStyle } from '../../../util/modalStyles'

interface RegisterModalProps {
  openRegister: boolean
  setOpenRegister: (active: boolean) => void
  setOpenConfirmation: (active: boolean) => void
  onChangeEmail: (email: string) => void
  onChangePassword: (password: string) => void
  onFinishRegister: () => void
}

export function RegisterModal({
  openRegister,
  setOpenRegister,
  setOpenConfirmation,
  onChangeEmail,
  onChangePassword,
  onFinishRegister
}: RegisterModalProps) {
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
    setAlerts([])
    onChangeEmail(email)
    onChangePassword(password)
  }, [email, password])

  useEffect(() => {
    setAlerts([])
  }, [username])

  useEffect(() => {
    if (finished) {
      onFinishRegister()
    }
  }, [finished])

  const passwordContainer = <PasswordContainer password={password} setPassword={setPassword} />

  const [currentContainer, setContainer] = useState(registerContainer)
  const [alerts, setAlerts] = useState<ReactNode[]>([])

  function handleClose() {
    setContainer(registerContainer)
    setButtonTxt('Next')
    setOpenRegister(false)
  }

  const userAlert = (
    <Alert severity="error" key="username-alert">
      Username length is less than 4 characters.
    </Alert>
  )
  const emailAlert = (
    <Alert severity="error" key="email-alert">
      Email address is invalid.
    </Alert>
  )
  const invalidUserAlert = (
    <Alert severity="error" key="invalid-user-alert">
      Username must be alphanumeric and cannot have spaces.
    </Alert>
  )

  /** See: https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression?page=1&tab=scoredesc */
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  const userRegex = /^[a-zA-Z][a-zA-Z0-9_-]+$/

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let validationErrors = false

    let currentAlerts: ReactNode[] = []

    if (username.length < 4) {
      currentAlerts.push(userAlert)
      validationErrors = true
    }
    if (!emailRegex.test(email)) {
      currentAlerts.push(emailAlert)
      validationErrors = true
    }
    if (!userRegex.test(username)) {
      currentAlerts.push(invalidUserAlert)
      validationErrors = true
    }

    setAlerts(currentAlerts)

    setTimeout(() => {
      setAlerts([])
    }, 1500)

    if (validationErrors) {
      return
    }

    switch (buttonTxt) {
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
    <Modal open={openRegister} onClose={handleClose}>
      <Card id="register-modal" style={modalStyle}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <CloseButton handleClose={handleClose} />
            {alerts.map((alert) => alert)}
            {currentContainer}
          </CardContent>
          <CardActions>
            <div className="button-row">
              {/* prettier-ignore */}
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
