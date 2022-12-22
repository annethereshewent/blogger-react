import { Card, TextField, Divider, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginUser } from '../../../util/loginUser'

interface LoginCardProps {
  openRegisterModal: () => void
}

export function LoginCard({ openRegisterModal }: LoginCardProps) {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const isLoggedIn = await loginUser(username, password)

    if (isLoggedIn) {
      navigate('/dashboard')
    }
  }

  return (
    <Card id="login-panel">
      <form onSubmit={login}>
        <TextField label="Email or username" onChange={handleUsername} />
        <TextField
          className="password-field"
          label="Password"
          type="password"
          onChange={handlePassword}
        />
        <div id="button-row">
          <Button variant="contained" color="primary" type="submit" style={{ width: '90%' }}>
            Sign In
          </Button>
        </div>
        <div className="links">
          <Link className="blogger-link" to="/forgot-password">
            Forgot password?
          </Link>
          <Divider />
          {/* prettier-ignore */}
          <div className="sign-up-link">
            <Button
              variant="contained"
              color="secondary"
              style={{ width: '50%' }}
              onClick={openRegisterModal}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
