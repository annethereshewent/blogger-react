import { Card, TextField, Divider, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useState, } from 'react'
import { AuthService } from '../../services/AuthService'

export function LoginCard() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const result = await new AuthService().login(email, password)

    const { data } = result

    const token = data.access_token

    if (token != null) {
      localStorage.setItem('apiToken', token)
      // redirect to dashboard
      navigate('/dashboard')
    }
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