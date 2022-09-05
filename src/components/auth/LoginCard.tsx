import { Card, TextField, Divider, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export function LoginCard() {
  return (
    <Card id="login-panel">
      <form onSubmit={login}>
        <TextField label="Email" onChange={updateEmail} />
        <TextField
          className="password-field"
          label="Password"
          type="password"
          onChange={updatePassword}
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

function login() {

}

function updatePassword() {

}

function updateEmail() {

}

function register() {

}