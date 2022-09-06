import { Card, TextField, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthService } from '../../services/AuthService'

export function LoginCard() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function login() {

  }

  function register() {

  }

  return (
    <Card id="login-panel">
      <form onSubmit={login}>
        <TextField label="Email" onChange={handleEmail} />
        <TextField
          className="password-field"
          label="Password"
          type="password"
          onChange={handlePassword}
        />
        <div id="button-row">
          <Button variant="contained" color="primary" type="submit" style={{width: "90%"}}>Sign In</Button>
        </div>
        <div className="links">
          <Link className="blogger-link" to="/forgot-password">
            Forgot password?
          </Link>
          <Divider />
          <div className="sign-up-link">
            <Button variant="contained" color="secondary" style={{width: "50%"}} onClick={register}>
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}