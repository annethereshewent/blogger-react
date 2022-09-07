
import {
  Container,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material'
import React from 'react'

interface RegisterContainerProps {
  username: string,
  email: string,
  gender: string,
  setUsername: (username: string) => void,
  setEmail: (email: string) => void,
  setGender: (gender: string) => void
}


export function RegisterContainer({username, email, setUsername, setEmail, setGender}: RegisterContainerProps) {
  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handleUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }

  function handleGender(e: React.ChangeEvent<HTMLInputElement>) {
    setGender(e.target.value)
  }

  return (
    <Container className="register-container">
      <Grid item xs={12}>
        <h2 className="title">Create your account</h2>
        <Grid item xs={6}>
          <TextField
            className="text-field"
            label="Username"
            onChange={handleUsername}
            required
          />

        </Grid>
        <Grid item xs={6}>
          <TextField
            className="text-field"
            label="E-mail"
            onChange={handleEmail}
            required
          />
        </Grid>
      </Grid>
      <Grid className="new-row" item xs={12}>
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup onChange={handleGender} row >
            <FormControlLabel value="F" control={<Radio required />} label="Female" />
            <FormControlLabel value="M" control={<Radio required />} label="Male" />
            <FormControlLabel value="X" control={<Radio required />} label="Other" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Container>
  )
}