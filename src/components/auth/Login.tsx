
import { Container, Grid } from '@mui/material'
import { Logo } from '../shared/Logo'
import '../../styles/login.scss'
import { LoginCard } from './LoginCard'
import { UserAccounts } from './UserAccounts'
import { RegisterModal } from './RegisterModal'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmationModal } from './ConfirmationModal'

export function Login() {
  const [openRegister, setOpenRegister] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)


  function openRegisterModal() {
    setOpenRegister(true)
  }

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('apiToken')
    if (token != null) {
      navigate('/dashboard')
    }
  })

  return  (
    <Container id="login-main">
      <Grid container>
        <Logo />
        <Grid id="existing-user-section" xs={5} item>
          <UserAccounts />
        </Grid>
        <Grid sm={12} lg={5} item>
          <Grid id="login-column" lg={10} sm={6} item>
            <LoginCard openRegisterModal={openRegisterModal} />
          </Grid>
        </Grid>
      </Grid>
      <RegisterModal openRegister={openRegister} setOpenRegister={setOpenRegister} setOpenConfirmation={setOpenConfirmation} />
      <ConfirmationModal openConfirmation={openConfirmation} setOpenConfirmation={setOpenConfirmation} />
    </Container>
  )
}