
import { Container, Grid } from '@mui/material'
import { Logo } from '../shared/Logo'
import '../../styles/login.scss'
import { LoginCard } from './LoginCard'
import { UserAccounts } from './UserAccounts'
import { RegisterModal } from './RegisterModal'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [open, setOpen] = useState(false)

  function openRegisterModal() {
    setOpen(true)
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
      <RegisterModal open={open} setOpen={setOpen} />
    </Container>
  )
}