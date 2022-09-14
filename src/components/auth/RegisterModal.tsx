import { Button, Card, CardActions, CardContent, IconButton, Modal } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { RegisterContainer } from './RegisterContainer'
import { PasswordContainer } from './PasswordContainer'
import { AuthService } from '../../services/AuthService'
import { User } from '../../types/User'

interface RegisterModalProps {
  openRegister: boolean,
  setOpenRegister: (active: boolean) => void
  setOpenConfirmation: (active: boolean) => void
}

export function RegisterModal({openRegister, setOpenRegister, setOpenConfirmation}: RegisterModalProps) {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: "24px",
    p: 4,
  }

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [buttonTxt, setButtonTxt] = useState('Next')
  const [password, setPassword] = useState('')

  const registerContainer = (
    <RegisterContainer
      setEmail={setEmail}
      setUsername={setUsername}
      setGender={setGender}
      email={email}
      username={username}
      gender={gender}
    />
  )

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
          console.log(`successfully registered user! ${JSON.stringify(user)}`)

          setContainer(passwordContainer)
          setButtonTxt('Next')
          handleClose()

          // finally open the email verification modal
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
      <Card id="register-modal" style={style}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            { currentContainer }
          </CardContent>
          <CardActions>
            <div className="button-row">
              <Button
                className="register-button"
                type="submit"
                variant="contained"
                color="primary"
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