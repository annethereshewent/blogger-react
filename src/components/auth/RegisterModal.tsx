import { Button, Card, CardActions, CardContent, Container, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Modal, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { RegisterContainer } from './RegisterContainer'
import { PasswordContainer } from './PasswordContainer'

interface RegisterModalProps {
  open: boolean,
  setOpen: (active: boolean) => void
}

export function RegisterModal({open, setOpen}: RegisterModalProps) {

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
    setOpen(false)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    switch(buttonTxt) {
      case 'Next':
        setContainer(passwordContainer)
        setButtonTxt('Finish')
        break
      case 'Finish':

        break
    }
  }

  return (
    <Modal
      open={open}
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